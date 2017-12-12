//Configurando uso de session en el servidor
var mysqlConnect = require('./mysql-connect/connection')
	session = require('express-session'),
	MySQLStore = require('express-mysql-session')(session),
    utils = require('./utils');

var connection = utils.loadFileSync('mysql-connection.json'),
	sessionStore = new MySQLStore(connection);
	
session = session({
    secret: 'keyboard cat',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
	cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
});

module.exports = {
	getSession: function(){
		return session;
	}
};