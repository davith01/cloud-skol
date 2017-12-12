var fs = require('fs'),
	path = require('path'),
	ejs = require('ejs');
	
var utils = {
	loadFileSync: function(resource){
		try {
			//Modulo en Node.js para manipular archivos
			var result = fs.readFileSync(path.join(__dirname+'/properties/',resource), "utf-8");
			result = JSON.parse(result);
			return result;
		} catch (err) {
			console.log(err);
			return null;
		}
	},
	loadFile: function(resource,callback){
		try {
			//Modulo en Node.js para manipular archivos
			var result = null;
			fs.readFile(path.join(__dirname+'/properties/',resource), "utf-8", function(err, data) {
				if(err) console.log(err);
				try {
					result = JSON.parse(data);
				} catch (err) { console.log(err); }
				
				callback(err,result);
				
			});
		} catch (err) {
			console.log(err);
			callback(err,result);
		}
	},
	getView: function(lang){
		if(!lang) lang = 'es';
		return utils.properties[lang];
	},
	jsonParse: function(req){
		try {
			var res = JSON.parse(req);
			return res;
		}
		catch(err){
			console.log(err);
			return {};
		}
	},
	traslate: function(value,lang) {
		view = utils.getView(lang);
		var traslate = ejs.render('<%= view.traslate.'+value+' %>', {view: view});
		return traslate;
	}
};

var resource = "app-properties.json";
utils.loadFile(resource,function(err,properties){
	utils.properties = properties;
});

module.exports = utils;
