var loginMysql = require('./mysql-connect/login-mysql'),
	session = require('express-session'),
    utils = require('./utils'),
	menuSystem = require('./menu-system/menu-system');

var login = {
  loginPage: function(req, res) {
	view = utils.getView();
	res.render('login', { "view": view });
  },
  loginAuth: function(req, res){
	if(req.body.action==='Login') {
		
		loginMysql.authLogin(req,function(err,idUserSystem){
			if(err) {
				res.header('Content-Type', 'text/json').send({"status":601,"message":err.message});	
			} else {
				if(idUserSystem) {
					req.body.idUserSystem = idUserSystem;
					loginMysql.getUser(req,function(err,user){
						if(!user.iconPerson) {
							var genere = user.generePerson === 1 ? 'male': user.generePerson === 2 ? 'female' : 'male';
							user.iconPerson = 'modules/user-profiles/resources/system/'+genere+'.png'
						}
						req.body.user = user;
						req.session.user = user;
						menuSystem.getMenuRolePermission(req,function(err,menu){
							req.session.menu = menu;
							res.header('Content-Type', 'text/json').send({"status":200,"message":"successful"});
						});						
					});
				}
				else {
					res.header('Content-Type', 'text/json').send({"status":701,"message":"user or password invalid"});	
				}
			}
		});
	}
	else {
		res.header('Content-Type', 'text/json').send({"status":701,"message":"error to invoke services"});
	}	
  },
  logOut: function(req,res){
	req.session.user = null;
  }
};

module.exports = login;
