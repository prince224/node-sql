var database = require ('mysql'),
	fs = require('fs');
	;

var parameter = JSON.parse(fs.readFileSync('app/parameters.json'));
var connect = database.createConnection(parameter);

/*-------------------------------------------------------------------- */
exports.databaseconnect = connect;
