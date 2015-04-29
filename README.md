# mylibrary

> A learning purposes project developed with latest technologies for both sides: server and client. It's a simple Library WebApp where books are stored under subjects. They can be removed too. You can watch the transactions in both sides.

URL: http://www.dagoflores.ca/projects/my-library/

## Getting Started
### Step 0
Be sure that **npm**, **Bower**, **Grunt**, and **MongoDB Server** latest stable versions have been installed in your computer. All modules will be installed in the following steps.

### Step 1
ZIP way: Extract content to a new folder.

### Step 2 - Server
Open your command prompt window as *Administrator* (PowerShell in Windows).

### Step 3
Go to `server` folder and install the dependencies executing the `npm install` command.

### Step 4
Open `init.js` file located in `server\node_modules\express\lib\middleware` folder using notepad or other text editor.

### Step 5
Add the Cross-site HTTP requests permissions to be able to get data from server using **Cross-Origin Resource Sharing (CORS)** mechanism. Details here.

### Step 6
Test the server:
* Run **MongoDB server** in a new command prompt window as *Administrator*.
* Execute the `grunt` command.
* Open `http://localhost:3000/` in your browser. You will see the **ExpressJS** welcome message. On the server command prompt window you will see details of operations (connections, http requests, etc.). This is good sign! Don't stop! pass to the next step.

### Step 7
Let the two command prompt windows openned because **MongoDB Server** and our *server* app are running. We will need them actives to be able to run the *client*.

### Step 8 - Client
Open another command prompt window.

### Step 9
Go to the `client` folder and install the dependencies executing the `npm install` command.

If any error occurs, execute 'npm install' command again.

### Step 10
Execute the `bower install` command.

### Step 11
Execute the `grunt serve` command on the *client* command prompt window.

### Step 12
If you'r curious, hit `F12` and see what's happening when you play the MyLibrary WebApp. Don't forget look at the *server* window too!

### Step 13
Have fun!

## Release History
* 2015-04-29   v0.0.1   Initial release.

## License
Copyright (c) 2015 Dago Flores [dagoflores.ca](http://www.dagoflores.ca).
Licensed under the MIT license.