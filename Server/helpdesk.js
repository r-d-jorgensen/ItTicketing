require('dotenv').config({ path: '.env.local' });

const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const prexit = require('prexit');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const validateAuth = expressjwt({
	secret: process.env.TICKET_SECRET,
	algorithms: ['HS256'],
});

app.use(helmet());
app.use(cors());
app.use(express.json());

const serverPort = process.env.TICKET_PORT || 80;
app.listen(serverPort, () => {
	console.log(`Started server at http://localhost:${serverPort}`);
});

const connection = mysql.createConnection({
	host: process.env.TICKET_DB_HOST,
	user: process.env.TICKET_DB_USER,
	password: process.env.TICKET_DB_PASSWORD,
	port: process.env.TICKET_DB_PORT,
	database: process.env.TICKET_DB_DATABASE,
});

connection.connect(function(err) {
	if (err) {
		console.error("Database connection failed: " + err.stack);
		return;
	}
	console.log("Connected to database.");
});

app.get('/protected', validateAuth, function(req, res) {
	if(req.user.email){
		res.send(`Logged in as ${req.user.email}`)
	}
});

app.get('/api/tickets', validateAuth, function(req, res) {
	console.log(`Getting tickets for userid: ${req.user.id}`)
	
	let queryOptions = req.query.filters  == undefined ? ({'query':'SELECT * FROM `ticket` WHERE `user_id` = ?', 'params':[req.user.id]}) : (function(filters){
		console.log(`Applying filter: ${req.query.filters}`)
		let string = 'SELECT * FROM `ticket` WHERE `user_id` = ?'
		let params = [req.user.id]
		if(filters.priority !== undefined){
			string += ' AND `ticket_severity` = ?'
			params.push(filters.priority)
		}
		
		if(filters.company !== undefined)
		{
			
		}
		
		if(filters.closed !== undefined)
		{
			string += ' AND `status` = ?'
			params.push(filters.closed)
		}
		
		if(filters.date !== undefined)
		{
			//Date format must be YYYY-MM-DD HH:MM:SS
			//A simple way to get a date in this format is the following: ( new Date().toISOString().replace('T', ' ').split('.')[0] )
			string += ' AND `created` BETWEEN ? AND ?'
			params.push(filters.date.start)
			params.push(filters.date.end)
		}
		
		return ({'query':string, 'params':params})
	}(JSON.parse(req.query.filters)))
	
	connection.query(queryOptions.query, queryOptions.params, (err, tickets) => {
		res.status(200).json(tickets)
	});
});

app.post('/api/auth', function apiAuth(req, res) {
	if (!req.is('application/json')) {
		return res.status(400).send({ message: 'Bad Request'});
	}

	let username;
	let userPass;
	try {
		username = req.body.hasOwnProperty('username') && req.body.username;
		userPass = req.body.hasOwnProperty('password') && req.body.password;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}

	// validate that the incoming username and password are strings
	// so that they can then be sanitized properly to prevent any
	// sort of sql injection.
	if (typeof username !== 'string' || typeof userPass !== 'string') {
		return res.status(400).send({ message: 'Bad Request' });
	}

	// username is escaped internally
	connection.query('SELECT * FROM  `user` WHERE `username` = ?', [username], (err, [user]) => {
		if (user) {
			const {
				user_id,
				password: passHash,
				user_type,
				email,
				first_name,
				last_name,
				phone_number
			} = user;
			bcrypt.compare(userPass, passHash).then((match) => {
				if (match) {
					const payload = {
						id: user_id,
						user_type,
						email,
						first_name,
						last_name,
						phone_number,
					};
					const token = jwt.sign(payload, process.env.TICKET_SECRET);
					res.status(201).json({ success: true, data: {
						token,
						user: payload,
					}});
				} else {
					res.sendStatus(401);
				}
			});
		} else {
			res.sendStatus(401);
		}
	});
});

//----------------------------------------------------------------View Ticket Notes------------------------------------------------
//Will return ticket notes from a specific ticket.
//Need ticket_id

app.get('/api/ticketnotes', validateAuth, function(req, res) {
	let ticketID;
	try {
		ticketID = req.query.ticketID;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}

	//Trying to figure out how to get the notes to send with the ticket.
	//Current sql call that pulls the ticket and the notes is
	//select * from ticket left join ticket_notes on ticket.ticket_id = ticket_notes.ticket_id where ticket.ticket_id = <ticket_id>
	//Only problems is it pulls the ticket info multiple times if there are multiple notes

	connection.query('SELECT * FROM  `ticket_notes` WHERE `ticket_id` = ?', [ticketID], (err, result) => {
		res.status(200).json(result)
	});
});
//----------------------------------------------------------------Create Ticket - Client------------------------------------------
//This is for the Client to create a ticket and insert it into the database
//Will need the info below
//User_id, Title, Body, status(1), ticket_severity 
app.post('/api/clientcreate', validateAuth,function(req, res) {
	
	if (!req.is('application/json')) {
		return res.status(400).send({ message: 'Bad Request'});
	}

	let userID;
	let title;
	let body;
	let status;
	let ticket_severity;

	try {
		userID 			= req.body.ticketID;
		title  			= req.body.title;
		body   			= req.body.body;
		status 			= req.body.status;
		ticket_severity = req.body.ticket_severity;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}


	var sql = "INSERT INTO ticket (title, body, status, user_id, ticket_severity) VALUES ?";
	var values = [title, body, status, userID, ticket_severity];

	connection.query(sql, [values], function(err,result) {
		if(err) throw err;
		
		res.status(200).json(result);
	})

});
//----------------------------------------------------------------Create Ticket - Tech--------------------------------------------

//----------------------------------------------------------------Add Notes To Ticket---------------------------------------------
//Insert Notes for a ticket. Info needed below
//Need TICKET_ID, TITLE, BODY
app.post('/api/addnote', validateAuth,function(req, res) {
	
	if (!req.is('application/json')) {
		return res.status(400).send({ message: 'Bad Request'});
	}

	let ticketID;
	let title;
	let body;

	try {
		ticketID 		= req.body.ticketID;
		title  			= req.body.title;
		body   			= req.body.body;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}

	var sql    = "INSERT INTO ticket_notes (title, body, ticket_id) VALUES ?";
	var values = [title, body, ticketID];

	connection.query(sql, [values], function(err,result) {
		if(err) throw err;
		
		res.status(200).json(result)
	})

});

//----------------------------------------------------------------Add User---------------------------------------------
//Insert User for a ticket. Info needed below
//Need email, first_name, last_name, password, phone_number, user_id, user_type, username
app.post('/api/adduser', validateAuth,function(req, res) {
	
	if (!req.is('application/json')) {
		return res.status(400).send({ message: 'Bad Request'});
	}

	let email;
	let first_name;
	let last_name;
	let password;
	let phone_number;
	let user_id;
	let user_type = "customer";
	let username;

	try {
		email			= req.body.email;
		first_name		= req.body.first_name;
		last_name		= req.body.last_name;
		password		= req.body.password;
		phone_number	= req.body.phone_number;
		user_id			= req.body.user_id;
		username		= req.body.username;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}

	var sql    = "INSERT INTO user (email, first_name, last_name, password, phone_number, user_type, username) VALUES ?";
	var values = [email, first_name, last_name, password, phone_number, user_type, username];

	connection.query(sql, [values], function(err,result) {
		if(err) throw err;
		
		res.status(200).json(result)
	})

});

app.use(function(err, req, res, next){
	if (err.name === 'SyntaxError') {
		return res.status(400).send({ message: 'Bad Request' });
	}

	console.error(err);
	if(err.name === 'UnauthorizedError'){
		console.log('jwt error');
		next();
	}
});

prexit(async () => {
	connection.end();
});
