'use strict'

// Import express
const express = require('express');

// Import client sessions
const sessions = require('client-sessions');

// The body parser
const bodyParser = require("body-parser");

// The mysql library
const mysql = require('mysql');

// Import uuid
const { v4: uuidv4 } = require('uuid');

// Import bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Import check-password-strength
const { passwordStrength } = require("check-password-strength");

// An https wrapper 
const https = require('https');

// For reading files
const fs = require('fs');

// Import helmet-csp
const contentSecurityPolicy = require('helmet-csp');

// Instantiate an express app
const app = express();

app.use(express.static(__dirname + '/public'));

// csp middleware
app.use(
	contentSecurityPolicy({
		useDefaults: true,
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'"],
			imgSrc: ["'self'", 'data:', 'http.cat'],
			objectSrc: ["'none'"],
			upgradeInsecureRequests: [],
		},
		reportOnly: false,
	})
);

// Set the view engine
app.set('view engine', 'ejs');

// Connect to the database
const mysqlConn = mysql.createConnection({
	host: "localhost",
	user: "appaccount",
	password: "apppass",
	multipleStatements: true

});


// Needed to parse the request body
// Note that in version 4 of express, express.bodyParser() was
// deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));

// The session settings middleware	
app.use(sessions({
	cookieName: 'session',
	secret: 'random_string_goes_here',
	duration: 10 * 60 * 1000,
	activeDuration: 10 * 60 * 1000,
}));

// The default page
// @param req - the request
// @param res - the response
app.get("/", function (req, res) {

	// Is this user logged in?
	if (req.session.id) {
		// Yes!
		res.redirect('/dashboard');
	}
	else {
		// No!
		res.render('loginpage');
	}

});


// The create account page
// @param req - the request
// @param res - the response
app.get("/create-account", function (req, res) {

	// Is this user logged in?
	if (req.session.id) {
		// Yes!
		res.redirect('/dashboard');
	}
	else {
		// No!
		res.render('create-account-page');
	}

});

app.get("/successpage", function (req, res) {
	res.render('successpage');
});

// middleware: check-password-strength
app.use("/create-account", (req, res, next) => {
	console.log("middleware: checking password strength...");
	console.log("Password:", passwordStrength(req.body.password).value);
	console.log("Password:", passwordStrength(req.body.password).length);
	console.log("Password:", passwordStrength(req.body.password).contains);

	if (passwordStrength(req.body.password).value === "Strong") {
		next();
	} else {
		res.send("Password Not Strong Enough! Please make sure to satisfy all password rules!");
	}
});


app.post("/create-account", function (req, res) {
	// Get the username and password data from the form
	let userName = req.body.username;
	let password = req.body.password;

	console.log("req.body.information: ", req.body.information);
	
	let initialInfo = req.body.information;

	let initialSession = "not logged in"

	bcrypt.hash(password, saltRounds, function (err, hash) {
		// Store hash in your password DB

		// Construct the query
		let query = "USE users; INSERT INTO appusers (username, password, info, session) VALUES ('" + userName + "', '" + hash + "', '" + initialInfo + "', '" + initialSession + "') ";
		console.log(query);

		mysqlConn.query(query, function (err, qResult) {

			if (err) throw err;

			console.log(qResult[1]);

			res.redirect('/successpage');

		});
	})


});

// The login page
// @param req - the request
// @param res - the response
app.get('/dashboard', function (req, res) {

	// Is this user logged in? Then show the dashboard
	if (req.session.id) {
		let username;
		let info;

		console.log("within /dashboard endpoint session id is: ", req.session.id);

		let query = "USE users; SELECT username, info from appusers where session='" + req.session.id + "' ";
		console.log(query);
		mysqlConn.query(query, function (err, qResult) {

			if (err) throw err;

			console.log("what is")
			console.log(qResult[1]);

			for (let account of qResult[1]) {
				username = account['username']
				info = account['info'];
				res.render('dashboard', { username: username, info: info });
			};
		});


	}
	//Not logged in! Redirect to the mainpage
	else {
		res.redirect('/');
	}

});

// The login script
// @param req - the request
// @param res - the response
app.post('/login', function (req, res) {

	// Get the username and password data from the form
	let userName = req.body.username;
	let password = req.body.password;

	const hash = bcrypt.hashSync(password, saltRounds);
	let passHashComparison = bcrypt.compareSync(password, hash);
	console.log("passHashComparison: ", passHashComparison);

	// Construct the query
	let query = "USE users; SELECT username from appusers where username='" + userName + "' ";
	console.log(query);


	// Query the DB for the user
	mysqlConn.query(query, function (err, qResult) {

		if (err) throw err;

		console.log(qResult[1]);

		// Does the password match?
		let match = false;

		// Go through the results of the second query
		for (let account of qResult[1]) {

			if (account['username'] == userName && passHashComparison) {
				console.log("Match!");

				// We have a match!
				match = true;

				//break;

			}
		};

		// Login succeeded! Set the session variable and send the user
		// to the dashboard
		if (match) {

			// create random id and store in cookie
			req.session.id = uuidv4()
			console.log("req.session.id: ", req.session.id)

			//store in db
			let query = "USE users; UPDATE appusers SET session='" + req.session.id + "'  WHERE username='" + userName + "' ";
			console.log(query);

			mysqlConn.query(query, function (err, res) {
				if (err) throw err;

				console.log(res[1]['message'])
			})


			res.redirect('/dashboard');
		}
		else {
			// If no matches have been found, we are done
			res.send("<b>Wrong</b>");
		}
	});



	/**
	if(correctPass && correctPass === password)
	{
		// Set the session
		req.session.username = userName;

		res.redirect('/dashboard');
	}
	else
	{
		res.send("Wrong!");
	}
	
	res.send("Wrong");

**/
});

// The logout function
// @param req - the request
// @param res - the response
app.get('/logout', function (req, res) {

	// clear session id from db
	let message = "not logged in"
	let query = "USE users; UPDATE appusers SET session='" + message + "'  WHERE session='" + req.session.id + "' ";
	console.log(query);

	mysqlConn.query(query, function (err, res) {
		if (err) throw err;

		console.log(res[1]['message'])
	})

	// Kill the session
	req.session.reset();

	res.redirect('/');
});

// Key data for certificates
let privateKey = fs.readFileSync('./mykey.key', 'utf8');
let certificate = fs.readFileSync('./mycert.crt', 'utf8');
let credentials = { key: privateKey, cert: certificate };

// Wrap the express communications inside https
let httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000, () => console.log('Visit https://localhost:3000/'));

