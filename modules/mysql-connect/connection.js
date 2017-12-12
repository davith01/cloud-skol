var mysql = require('mysql');
    utils = require('../utils');

var connection = utils.loadFileSync('mysql-connection.json');

function mysqlConnect() {
    this.con = mysql.createConnection(connection);	
};

mysqlConnect.prototype.select = function(sql,data,callback) {
	var con  = this.con;
	con.connect(function(err) {
		if (err) {
			console.log(err);
			callback(err,false);
		}
	    else {
			con.query(sql,data,function (err, result) {
				if(err) console.log(err);
				callback(err, result);
			});	
		}
	});
};	


module.exports = mysqlConnect;