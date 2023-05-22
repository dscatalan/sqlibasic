# CPSC 455 - Assignment 3: Defense in Depth, SQL Injections, Authentication, and Sensitive Data

# Information

1. [Working code [ZIP]](https://github.com/dscatalan/sqlibasic/archive/refs/heads/main.zip) 
2. Member(s) and database instructions
    - Daisy Catalan 
    - Read [notes](/notes.txt) for instructions on creating the database 
4. View [illustrations](/illustrations.md) for app information (screenshots, etc...).  

## Tech Stack
Versions are given for record keeping. They are not necessarily required unless stated otherwise.

> Note: Everything will be done in a Linux Virtual Machine. 
- [Virtual Box 7](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview)
    (*direct download link: [`ubuntu-22.04.2-desktop-amd64.iso`](https://ubuntu.com/download/desktop/thank-you?version=22.04.2&architecture=amd64)*)
- [MariaDB](/notes.txt) (*version `10.6.12-MariaDB-0ubuntu0.22.04.1`*)
- Node (*version `18.16.0`*)
  - required: { node: '>=16.14' }
- NPM (*version `9.6.7`*)

How to Install latest version of Node.js:

```shell
curl -s -L http://git.io/n-install | bash -s -- -y
. $HOME/.bashrc
```
Close Terminal

Open New Terminal
```shell
npm update --global
```

# Get Started 

Optionally, create a linux based virtual machine to work in. The virtual machine will make it easier to work with MariaDB server.  

Clone the Project
```
git clone https://github.com/dscatalan/sqlibasic.git
cd sqlibasic/
```

*Make sure the database has been set up before proceeding.*

Start The Project

```
node sessions.js
```

