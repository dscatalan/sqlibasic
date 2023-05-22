# Illustrations...



# Initial Step

**First, We need to start the database and the app.**

current state of database (after initial creation):

Follow Steps 15 to 18 from [notes](./notes.txt) to view `appusers` table.

![image-20230522062655358](illustrations.assets/image-20230522062655358.png)

```shell
cd sqlibasic/
node sessions.js
```

Visit https://localhost:3000/

Click `Advanced`

Click `Accept the Risk and Continue`

Click `Create account.`



## That multiple users can create an account.

Create Two Accounts

Account 1 Details (use chrome client)

```
username: daisy
password: A2345678b+
info: The sky is blue
```

![image-20230522063138605](illustrations.assets/image-20230522063138605.png)

![image-20230522063155132](illustrations.assets/image-20230522063155132.png)

Account 2 Details (use Firefox client)

```
username: john
password: Bpd2*09w_P
info: I need to go to the store.
```

![image-20230522063247171](illustrations.assets/image-20230522063247171.png)

![image-20230522063200901](illustrations.assets/image-20230522063200901.png)



```mariadb
SELECT * from appusers;
```

![image-20230522063359762](illustrations.assets/image-20230522063359762.png)



## That multiple users can login and correct information is shown upon login/visiting the website with a valid session.



Login Two Accounts

Account 1 Details (use chrome client)

```
username: daisy
password: A2345678b+
```

Account 2 Details (use Firefox client)

```
username: john
password: Bpd2*09w_P
```

![image-20230522065243480](illustrations.assets/image-20230522065243480.png)

Press `submit`

![image-20230522065329055](illustrations.assets/image-20230522065329055.png)

current state of database, after multiple account login:

```mariadb
SELECT * from appusers;
```

![image-20230522065407210](illustrations.assets/image-20230522065407210.png)



## That user's can logout and after logout the user is directed to login if they visit the site.

Press `Logout` on both `daisy` and `john` accounts. Page should redirect after pressing `Logout`.

![image-20230522065637497](illustrations.assets/image-20230522065637497.png)

current state of database, after multiple account Logout:

```mariadb
SELECT * from appusers;
```

![image-20230522065657598](illustrations.assets/image-20230522065657598.png)

## An explanation and screenshots explaining how the code meets each requirement.
### Step 1. Add a "session" attribute to the appusers table.

Please look at step 11 in [notes](/notes.txt)

This is what `appusers` should look like:

![image-20230522071013859](illustrations.assets/image-20230522071013859.png)


### Step 7. Add a self-signed HTTPs certificate.

![image-step-7](illustrations.assets/image-step-7.png)

```shell
cd sqlibasic/

openssl req -newkey rsa:2048 -nodes -keyout mykey.key -x509 -days 365 -out mycert.crt
```

```shell
US
California
Fullerton
DaisyORG
WebSEC
Daisy
dscatalan@gmail.com
```

