# Illustrations...

## That multiple users can create an account.

## That multiple users can login and correct information is shown upon login/visiting the website with a valid session.

## That user's can logout and after logout the user is directed to login if they visit the site.

## An explanation and screenshots explaining how the code meets each requirement.

### Step 7. Add a self-signed HTTPs certificate.

![](/home/student/sqlibasic/illustrations.assets/Screenshot from 2023-05-22 03-51-03.png)

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

