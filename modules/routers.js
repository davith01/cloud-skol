var express = require('express'),
	session = require('express-session'),
	utils = require('./utils');
	
var router = express.Router();

//Login Services
var login = require('./login');
router.get('/login', login.loginPage);
router.post('/login/auth', login.loginAuth);
router.get('/logOut', login.logOut);

//App Services
var services = require('./services');
router.get('/services/:servicesName',function(req,res){
  services[req.params.servicesName](req,res);
});

router.get('/', function(req, res){
	view = utils.getView();
	view.user = req.session.user;
	view.menu = req.session.menu;
	res.render('index', { "view": view });
});

router.get('/otherwise', function(req, res){
	view = utils.getView();
	res.render('templates/otherwise', { "view": view });
});


//Login Services
var usersSystem = require('./user-system/user-system');



router.get('/views/:module/:template', function(req, res) {
	var page = './modules/' + req.params.module + '/' + req.params.template;
	view = utils.getView();
	res.render(page, { "view": view });
});

module.exports = router;
