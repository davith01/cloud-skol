var mysqlConnect = require('./connection');
	utils = require('../utils');

var roleSystemMysql = {
	getRolePermissionByUser: function(req, callback) {
		
		var sql = "SELECT r.idRoleSystem,r.roleName,r.permissions ";
			sql = sql + " FROM userRoleSystem u INNER JOIN roleSystem r ON  u.idRoleSystem = r.idRoleSystem";
			sql = sql + " WHERE u.idUserSystem = ?";
		
		var data = [req.body.idUserSystem];
		
		new mysqlConnect().select(sql,data,function(err,result){
			var res = null;
			if(result && result.length > 0) {
				res = result[0];
				res.permissions = utils.jsonParse(res.permissions);
			}
			callback(err,res);
		});
	}
};
module.exports = roleSystemMysql;
