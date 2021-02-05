const mysql = require('mysql');

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
	if(err) throw err;
	connection.query("SELECT * FROM ticket_assigned", function(err, result, fields){
	if(err) throw err;
	console.log(result);
	});

});


