require('dotenv').config({ path: '.env.local' });

const bcrypt = require('bcrypt');
const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const prexit = require('prexit');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const validateAuth = expressjwt({
	secret: process.env.TICKET_SECRET,
	credentialsRequired: false,
	algorithms: ['HS256'],
	getToken ({ cookies }) {
		if (cookies && cookies.session) {
			return cookies.session;
		}
		return null;
	}
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
	if(err) {
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

app.post('/api/auth', function apiAuth(req, res) {
	const { email, password } = req.body;
	console.log('api/auth', req.body);

	//validate that the incoming email and password are strings
	//so that they can then be sanitized properly to prevent any
	//sort of sql injection.
	if(typeof email !== 'string' || typeof password !== 'string'){
		res.status(400).send('Bad Request');
		return;
	}

	// email is escaped internally
	connection.query('SELECT * FROM  `user` WHERE `email` = ?', [email], (err, [user]) => {
		if (user) {
			const { password: pHash, user_type, first_name, last_name, phone_number } = user;
			bcrypt.compare(password, pHash).then((match) => {
				if (match) {
					const token = jwt.sign(email + user.user_id, process.env.TICKET_SECRET);
					res.cookie('token', token, { httpOnly: true, secure: true });
					res.json({'success': true, user: {
						   email,
						   first_name,
						   last_name,
						   phone_number,
						   user_type,
						}
					});
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
	console.log(err.name)
	if(err.name === 'UnauthorizedError'){
		console.log('jwt error');
		next();
	}
});

prexit(async () => {
	connection.end();
});
