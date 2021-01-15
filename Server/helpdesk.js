const mysql = require('mysql');

var connection = mysql.createConnection({
	host: "helpdesk.c0rr1djesv53.us-west-1.rds.amazonaws.com",
	user: "admin",
	password: "Helpde$kP0j3ct",
	port: "3306",
	database: "Schema1",
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


