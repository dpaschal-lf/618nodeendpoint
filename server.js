

const express = require('express'); //load the code for the express server
const mysql = require('mysql'); //load the code for mysql
const credentials = require('./mysqlcredentials.js'); //load the credential object from mysqlcredentials.js

const connection = mysql.createConnection( credentials ); //establish an initial connection to db

const server = express(); //build the webserver

//use express to tell the server to use a static folder for generic URL requests that do not have specific handlers below
server.use( express.static(__dirname + '/html')); 



//on the listening port, look for a URL of 'users' with a GET method, and call this function when it happens
server.get('/users', (request, response)=>{
	//setup the data object for sending back data
	const output = {
		success: false,
		data: null
	}
	connection.connect(()=>{ //connect to the DB based on current credentials
		let query = '';
		if(request.query.user_id){
			query = `SELECT * FROM users WHERE ID=${request.query.user_id}`;
		} else {
			query = 'SELECT ID, name, email, status FROM users';
		}
		connection.query(query, (error, data, fields)=>{ //query the database and wait for response
			if(!error){ //if there was no error
				output.success = true; //change the data
				output.data=data;

			} else { //there was an error
				output.error = error; //add the error info to the output object
			}
			const json_output = JSON.stringify(output) //convert the output object to a string
			response.send(output); //response with the string
		})

	});

})

//tell the server to listen on port 3000, and when it finishes the start of listening, call this callback function
server.listen(3000, ()=>{
	console.log('server is listening on port 3000');
})