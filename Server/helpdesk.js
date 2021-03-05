const mysql = require('mysql');
const express = require('express');
const { expressCspHeader, SELF } = require('express-csp-header');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const app = express();
const serverPort = 80
const validateAuth = expressjwt({
	secret: 'itT1ck3t1ng',
	credentialsRequired: false,
	algorithms: ['HS256'],
	getToken: function fromCookie(req){
		if(req.cookies.session){
			return req.cookies.session;
		}
		return null;
	}
});
app.use(expressCspHeader({directives: {'default-src': [SELF]}}))
app.use(express.json());
app.use(cookieParser());

app.listen(serverPort, () => {
	console.log(`Started server at http://localhost:${serverPort}`);
});


var connection = mysql.createConnection({
	host: "host",
	user: "user",
	password: "Password",
	port: "port",
	database: "database",
});

connection.connect(function(err) {
	if(err) {
		console.error("Database connection failed: " + err.stack);
		return;
	}
	console.log("Connected to database.");

	//display variables in ticket_assigned
	//if(err) throw err;
	//connection.query("SELECT * FROM ticket_assigned", function(err, result, fields){
	//if(err) throw err;
	//console.log(result);
	//});

});

app.get('/protected', validateAuth, function(req, res){
	if(req.user.email){
		res.send(`Logged in as ${req.user.email}`)
	}
});

app.post('/api/auth', function (req, res){
	var email = req.body.email
	var password = req.body.password

	//validate that the incoming email and password are strings
	//so that they can then be sanitized properly to prevent any
	//sort of sql injection.
	if(typeof email != 'string' || typeof password != 'string'){
		res.status(400).send('Bad Request');
		return;
	}

	var escapedEmail = connection.escape(email)
	var escapedPassword = connection.escape(password)
	
	connection.query(`SELECT * FROM tech WHERE password = ${escapedPassword} AND email = ${escapedEmail}`, function(err, result, fields){
		if(err) throw err;
		if(result.length){
			res.cookie('session', jwt.sign({'email':email}, 'itT1ck3t1ng').toString(), { httpOnly: true});
			res.send({'success': true, 'isEmployee': true});
		}
		else{
			connection.query(`SELECT * FROM user WHERE password = ${escapedPassword} AND email = ${escapedEmail}`, function(err, result, fields){
				if(err) throw err;
				if(result.length){
					res.cookie('session', jwt.sign({'email': email}, 'itT1ck3t1ng').toString(), { httpOnly: true});
					res.send({'success': true, 'isEmployee': false});
				}
				else{
					res.send({'success':false});
				}
			})
		}
	})
})

app.get('/', function(req, res){
	res.send('ItTicketing API');
})

app.use(function(err, req, res, next){
	console.log(err.name)
	if(err.name === 'UnauthorizedError'){
		console.log('jwt error');
		next();
	}
});
