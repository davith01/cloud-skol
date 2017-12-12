var mysqlConnect = require('./connection');

var loginMysql = {
	authLogin: function(req, callback){
		var user = false;
		var sql = "SELECT idUserSystem ";
			sql = sql + " FROM usersystem u ";
			sql = sql + " WHERE userName = ? AND userPassword = ? ";
		
		data = [req.body.userName, req.body.userPassword];
		
		new mysqlConnect().select(sql,data,function(err,result){
			var idUserSystem = null;
			if(result && result.length > 0) {
				user = result[0];
				if(user.idUserSystem){
					idUserSystem = user.idUserSystem;	
				}
			}
			callback(err,idUserSystem);			
		});
	},
	getUser: function(req, callback){
		var sql = "SELECT u.idUserSystem,userName,lastChangePassword,nextChangePassword,p.idPersonContact,namePerson,lastNamePerson,generePerson,defaultServicesSelected,iconPerson ";
			sql = sql + " FROM usersystem u INNER JOIN personContact p ON u.idPersonContact = p.idPersonContact ";
			sql = sql + " WHERE u.idUserSystem = ?";
		
		data = [req.body.idUserSystem];
		
		new mysqlConnect().select(sql,data,function(err,result){
			var user = null;
			if(result && result.length > 0) {
				user = result[0];
			}
			callback(err,user);
		});
	}
};
module.exports = loginMysql;
