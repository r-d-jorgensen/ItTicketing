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
	
	let filters = Object.create(null);
	if (req.query.filters) {
		try {
			const parsedFilters = JSON.parse(req.query.filters);
			['priority', 'closed', 'date'].map((key) => {
				if (key in Object.keys(parsedFilters)) {
					if (key === 'date') {
						const { start, end } = parsedFilters.date;
						// TODO: verify start, end are actual dates.
						filters[key] = [
							connection.escape(start),
							connection.escape(end),
						];
					} else {
						filters[key] = connection.escape(parsedFilters[key]);
					}
				}
			})
			Object.freeze(filters);
		} catch (_) {
			return res.status(400).send({ message: 'Bad Request'});
		}
		}
		
	const userId = connection.escape(req.user.id);
	const query = `
		select
			t.ticket_id as id,
			t.created,
			t.title,
			t.body,
			t.status,
			t.date_closed,
			t.user_id,
			t.ticket_severity,
			JSON_ARRAYAGG(JSON_OBJECT(
				'first_name', uta.first_name,
				'last_name', uta.last_name,
				'phone_number', uta.phone_number,
				'email', uta.email
			)) as assigned
		from
			ticket t
			join (
				select
					ta.ticket_id,
					user.first_name,
					user.last_name,
					user.phone_number,
					user.email,
					user.user_id,
					ta.employee_id,
					ta.end as assign_end
				from ticket_assigned ta
				join user on ta.employee_id = user.user_id
			) uta using(ticket_id)
		where (
			${filters.date ? `\`created\` BETWEEN ${filters.date.start} and ${filters.date.end} and` : ''}
			${filters.priority ? '`t.ticket_severity` = ' + filters.priority + ' and' : ''}
			${filters.status ? '`t.status` = ' + filters.status + ' and' : ''}
			(t.user_id = ${userId} or uta.employee_id = ${userId}) and
			((t.date_closed <= now() and (uta.assign_end is null or uta.assign_end = t.date_closed)) or
			(t.date_closed is null and (uta.assign_end is null or not uta.assign_end < now())))
		)
		group by t.ticket_id
		union select
			t2.ticket_id as id,
			t2.created,
			t2.title,
			t2.body,
			t2.status,
			t2.date_closed,
			t2.user_id,
			t2.ticket_severity,
			null
		from
			ticket t2
			join (
				select
					ta.ticket_id,
					count(employee_id) as assigned
				from ticket_assigned ta
				group by ticket_id
				having assigned = 0
			) unassigned using(ticket_id)
		where (
			${filters.date ? `\`created\` BETWEEN ${filters.date.start} and ${filters.date.end} and` : ''}
			${filters.priority ? '`t2.ticket_severity` = ' + filters.priority + ' and' : ''}
			${filters.status ? '`t2.status` = ' + filters.status + ' and' : ''}
			t2.user_id = ${userId}
		)
		order by created
	`;
			
	connection.query(query, (err, tickets) => {
		res.status(200).json(Array.from(tickets, (t) => {
			t.assigned = JSON.parse(t.assigned);
			return t;
		}));
	});
});
		
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
