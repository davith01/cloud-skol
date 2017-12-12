var mysqlConnect = require('./connection');
	utils = require('../utils');

var userSystemMysql = {
	getUserSystem: function(req, callback) {
		
		var sql = "SELECT u.idUserSystem, userName, lastChangePassword, defaultServicesSelected, namePerson, lastNamePerson, birthDayPerson, generePerson, iconPerson";
			sql = sql + " FROM userSystem u INNER JOIN person_contact p ON p.idPersonContact = u.idPersonContact INNER JOIN contactInfo c ON c.idContactInfo = p.idContactInfo";
		
		var data = [req.body.idUserSystem];
		
		new mysqlConnect().select(sql,data,function(err,result){
			var res = null;
			if(result && result.length > 0) {
				res = result[0];
			}
			callback(err,res);
		});
	},
	getUsers: function(req, callback) {
		
		var sql = "SELECT * FROM userSystem u ";
		new mysqlConnect().select(sql,function(err,result){
			var res = null;
			if(result && result.length > 0) {
				res = result[0];
			}
			callback(err,res);
		});
	}
};
module.exports = userSystemMysql;
 