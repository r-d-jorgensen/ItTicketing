require('dotenv').config({ path: '.env.local' });

const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const prexit = require('prexit');
const cors = require('cors');
const helmet = require('helmet');
const { UnauthorizedError } = require('express-jwt');

const app = express();
const httpServer = require('http').createServer(app);

const corsOpts = {
	// TODO: dont use wildcard origin
	origin: '*',
	methods: ['GET', 'POST'],
	preflightContinue: false,
	optionsSuccessStatus: 204,
};
Object.freeze(corsOpts);

const io = require('socket.io')(httpServer, {
	cors: corsOpts,
});

const validateAuth = expressjwt({
	secret: process.env.TICKET_SECRET,
	algorithms: ['HS256'],
});

io.use(async (socket, next) => {
	const parts = socket.handshake.auth.token && socket.handshake.auth.token.split(' ');
	let token;
	if (parts.length === 2) {
		const [scheme, credentials] = parts;
		if (/^Bearer$/i.test(scheme)) {
			token = credentials;
		} else {
			return next(new UnauthorizedError('credentials_bad_format', { message: 'Token format: Bearer [token]' }));
		}
	} else {
		return next(new UnauthorizedError('credentials_bad_format', { message: 'Token format: Bearer [token]' }));
	}

	if (!token) {
		return next(new UnauthorizedError('credentials_required', { message: 'Missing token' }));
	}

	jwt.verify(token, process.env.TICKET_SECRET, (err, decoded) => {
		if (err) {
			return next(new UnauthorizedError('invalid_token', err));
		} else {
			socket.user = decoded;
			return next();
		}
	})
});

io.on('connection', async (socket) => {
	// TODO: sanitize inputs
	// TODO: add room for each ticket?
	// TODO: check permissions

	socket.on('new_message', ({ message, user_id, ticket_id }) => {
		const query = `
			INSERT INTO \`ticket_messages\`
			(message, user_id, ticket_id)
			VALUES
			?
		`;
		connection.query(query, [[[message, user_id, ticket_id]]], (err, { insertId }) => {
			if (err) {
				// TODO: better error handling
				socket.emit('new_message_fail', {
					ticket_id,
					user_id,
				})
			} else {
				const detailQuery = `
					select
						tm.message_id as id,
						tm.message,
						tm.created,
						tm.modified,
						tm.ticket_id,
						JSON_OBJECT(
							'first_name', u.first_name,
							'last_name', u.last_name,
							'phone_number', u.phone_number,
							'email', u.email
						) as author
					from ticket_messages tm join user u using(user_id)
					where tm.message_id = ?
				`;
				connection.query(detailQuery, [insertId], (err, [msg]) => {
					msg.author = JSON.parse(msg.author);
					socket.emit('new_message_success', msg);
				});
			}
		})
	});

	socket.onAny((name, data) => {
		console.log(name, data);
	});
})

app.use(helmet());
app.use(cors(corsOpts));
app.use(express.json());

const serverPort = process.env.TICKET_PORT || 80;
httpServer.listen(serverPort, () => {
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
			const objKeys = new Set(Object.keys(parsedFilters));
			['priority', 'status', 'date'].map((key) => {
				if (objKeys.has(key)) {
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
			t.company,
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
			${filters.date ? `created BETWEEN ${filters.date.start} and ${filters.date.end} and` : ''}
			${filters.priority ? 't.ticket_severity = ' + filters.priority + ' and' : ''}
			${filters.status ? 't.status = ' + filters.status + ' and' : ''}
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
			t2.company,
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
			${filters.date ? `created BETWEEN ${filters.date.start} and ${filters.date.end} and` : ''}
			${filters.priority ? 't2.ticket_severity = ' + filters.priority + ' and' : ''}
			${filters.status ? 't2.status = ' + filters.status + ' and' : ''}
			t2.user_id = ${userId}
		)
		order by created
	`;

	connection.query(query, (err, tickets) => {
		res.status(200).json(Array.from(tickets || [], (t) => {
			t.assigned = JSON.parse(t.assigned);
			t.assigned && t.assigned.forEach((emp) => { emp.company = t.company; });
			delete t.company;
			return t;
		}));
	});
});

app.get('/api/ticket/:id/messages', validateAuth, function (req, res) {
	const ticket_id = req.params.id;
	console.log(`Getting ticket with ticket_id: ${ticket_id}`)

	if (!(req.user.user_type === 'employee' || req.user.user_type === 'customer')) {
		console.log('not employee or customer');
		return res.status(401).send({ message: 'Unauthorized' });
	}

	const query = 'select user_id from `ticket` where `ticket_id` = ?';
	connection.query(query, [ticket_id], (err, [ticket]) => {
		const detailQuery = `
			select
				tm.message_id as id,
				tm.message,
				tm.created,
				tm.modified,
				tm.ticket_id,
				JSON_OBJECT(
					'first_name', u.first_name,
					'last_name', u.last_name,
					'phone_number', u.phone_number,
					'email', u.email
				) as author
			from ticket_messages tm join user u using(user_id)
			where \`ticket_id\` = ?
			order by tm.created desc
		`;

		if (req.user.id === ticket.user_id) {
			connection.query(detailQuery, [ticket_id], (err, details) => {
				res.status(200).json(Array.from(details, (detail) => {
					detail.author = JSON.parse(detail.author);
					return detail;
				}));
			});
		} else if (req.user.user_type === 'employee') {
			const checkAssigned = `
				select
					ticket_id,
					end
				from ticket_assigned ta
				where (
					end is null and
					ticket_id = ? and
					employee_id = ?
				)
			`;
			connection.query(checkAssigned, [ticket_id, req.user.id], (err, assignments) => {
				if (Array.from(assignments || []).length > 0) {
					connection.query(detailQuery, [ticket_id], (err, details) => {
						res.status(200).json(Array.from(details, (detail) => {
							detail.author = JSON.parse(detail.author);
							return detail;
						}));
					});
				}
			});
		} else {
			return res.status(401).send({ message: 'Unauthorized' });
		}
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

	connection.query('SELECT * FROM ticket_notes WHERE ticket_id = ?', [ticketID], (err, result) => {
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

	let title;
	let body;
	let ticket_severity;

	try {
		title  			= req.body.title;
		body   			= req.body.body;
		ticket_severity = req.body.ticket_severity;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}


	const sql = 'INSERT INTO ticket (title, body, status, user_id, ticket_severity) VALUES ?';
	connection.query(sql, [[[title, body, 1, req.user.id, ticket_severity]]], function(err, { insertId }) {
		if(err) throw err;
		connection.query(
			'INSERT INTO ticket_assigned (ticket_id) VALUES ?',
			[[[insertId]]],
			() => { res.status(201).json({ id: insertId }); },
		);
	})
});


// Client Delete
app.post('/api/clientdelete/:id', validateAuth, function(req, res) {
	const user_id = connection.escape(req.user.id);
	const ticket_id = connection.escape(req.params.id);
	connection.query(
		`SELECT user_id FROM ticket WHERE (user_id = ${user_id} AND ticket_id = ${ticket_id})`,
		(err, [result]) => {
			if (err || !(result && result.user_id === req.user.id)) {
				return res.status(401).json('Unauthorized');
			}
			connection.query(
				`DELETE FROM ticket WHERE ticket_id = ${ticket_id}`,
				(delErr, resp) => {
					if (delErr) {
						return res.status(500).json('Internal Server Error');
					}
					res.status(202).json({ id: ticket_id });
				},
			);
		}
	);
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
	let bodytext;
	
	try {
		ticketID 		= req.body.params.ticketID;
		bodytext		= req.body.params.body;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}

	var sql    = "INSERT INTO `ticket_notes` (body, ticket_id) VALUES (?, ?)";
	var values = [bodytext, ticketID];

	connection.query(sql, values, function(err,result) {
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

	var sql    = "INSERT INTO user (email, first_name, last_name, password, phone_number, user_type, username) VALUES (?,?,?,?,?,?,?)";
	var values = [email, first_name, last_name, password, phone_number, user_type, username];

	connection.query(sql, [values], function(err,result) {
		if(err) throw err;
		
		res.status(200).json(result)
	})

});
//----------------------------------------------------------------Update Note on Ticket---------------------------------------------
//Update ticket description
//Need TICKET_ID, NOTE_ID,BODY

app.post('/api/updatenote', validateAuth,function(req, res) {
	
	if (!req.is('application/json')) {
		return res.status(400).send({ message: 'Bad Request'});
	}

	let ticketID;
	let noteID;
	let body;

	try {
		ticketID 		= req.body.params.ticketID;
		noteID			= req.body.params.noteID;
		body   			= req.body.params.body;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}

	var sql    = "UPDATE ticket_notes SET body = ? WHERE note_id = ? AND ticket_id = ?";
	var values = [body, noteID, ticketID];

	connection.query(sql, [values], function(err,result) {
		if(err) throw err;
		
		res.status(200).json(result)
	})

});

//----------------------------------------------------------------Update Status on Ticket---------------------------------------------
//Update ticket description
//Need TICKET_ID, New Status. 0=closed, 1=open

app.post('/api/updatestatus', validateAuth,function(req, res) {
	
	if (!req.is('application/json')) {
		return res.status(400).send({ message: 'Bad Request'});
	}

	let ticketID;
	let status;

	try {
		ticketID 		= req.body.params.ticketID;
		status			= req.body.params.status;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}

	var sql    = "UPDATE ticket SET status = ? WHERE ticket_id = ?";
	var values = [status, ticketID];

	connection.query(sql, [values], function(err,result) {
		if(err) throw err;
		
		res.status(200).json(result)
	})

});

//----------------------------------------------------------------Delete Ticket Note---------------------------------------------
//Update ticket description
//Need TICKET_ID, NOTE_ID

app.post('/api/deletenote', validateAuth,function(req, res) {
	
	if (!req.is('application/json')) {
		return res.status(400).send({ message: 'Bad Request'});
	}

	let ticketID;
	let noteID;

	try {
		ticketID 		= req.body.params.ticketID;
		noteID			= req.body.params.noteID;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}

	var sql    = "DELETE FROM ticket_notes WHERE ticket_id = ? and note_id = ?";
	var values = [ticketID, noteID];

	connection.query(sql, [values], function(err,result) {
		if(err) throw err;
		
		res.status(200).json(result)
	})

});

//----------------------------------------------------------------Update Severity on Ticket---------------------------------------------
//Update ticket description
//Need TICKET_ID, New Severity

app.post('/api/updateseverity', validateAuth,function(req, res) {
	
	if (!req.is('application/json')) {
		return res.status(400).send({ message: 'Bad Request'});
	}

	let ticketID;
	let severity;

	try {
		ticketID 		= req.body.params.ticketID;
		severity		= req.body.params.severity;
	} catch (_) {
		return res.status(400).send({ message: 'Bad Request' });
	}

	var sql    = "UPDATE ticket SET ticket_severity = ? WHERE ticket_id = ?";
	var values = [severity, ticketID];

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
