

const express = require('express'); //load the code for the express server
const mysql = require('mysql');
const credentials = require('./mysqlcredentials.js');

const connection = mysql.createConnection( credentials );

const server = express(); //build the webserver

//use express to tell the server to use a static folder for generic URL requests that do not have specific handlers below
server.use( express.static(__dirname + '/html')); 

//on the listening port, look for a URL of 'users' with a GET method, and call this function when it happens
server.get('/users', (request, response)=>{
	response.send('data!');
})

//tell the server to listen on port 3000, and when it finishes the start of listening, call this callback function
server.listen(3000, ()=>{
	console.log('server is listening on port 3000');
})