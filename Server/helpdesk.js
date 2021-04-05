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
		
		if(filters.Date !== undefined)
		{
			//Date format must be YYYY-MM-DD HH:MM:SS
			//A simple way to get a date in this format is the following: ( new Date().toISOString().replace('T', ' ').split('.')[0] )
			string += ' AND `created` BETWEEN ? AND ?'
			params.push(filters.Date.start)
			params.push(filters.Date.end)
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
