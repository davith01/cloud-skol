var userMsql = require('../mysql-connect/user-system-mysql'),
	utils = require('../utils');;

var userSystem = {
	getUsers: function(req,callback) {
		userMsql.getUsers(req,function(err,users){
				callback(err,users);
		});
	}
};
module.exports = userSystem;
