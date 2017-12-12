var utils = require('./utils');

var services = {		
	routers: function(req,res){
		var routers = utils.loadFileSync('routers.json');
		res.header('Content-Type', 'text/json').send({"status":200,"data":routers});
	}
}

module.exports = services;