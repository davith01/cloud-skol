// Express Framewor 'MVC' para crear aplicaciones web con Node.js
var express = require('express'),
    cons    = require('consolidate'),
	ejs     = require('ejs'),
	favicon = require('serve-favicon'),
    app     = express(),
    http    = require('http'),
    server  = http.createServer(app),
	port    = process.env.PORT || 5656;
    path   = require('path'),
	fs = require('fs');

	
//Configurando uso de session en el servidor
var sessionStorage = require('./modules/session-storage').getSession();
app.use(sessionStorage);

// Configurando parametros de funcionamiento para express con respecto a la aplicacion
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Motor de templates utilizando Consolidate, swig y ejs
// To set html rendered by ejs view engine
app.engine('html', function (filePath, options, callback) { 
    fs.readFile(filePath, function (err, content) {
        if(err) return callback(err);
		cons.swig(filePath,options,function(err, html){
			if(err) console.log(err);
			var rendered = ejs.render(html.toString(),options);
			return callback(null, rendered);
		});
    });
});

app.set('view engine','html');

// Path o directorio donde se encuentran los templates
app.set('views', path.join(__dirname, 'views'));

// Sirviendo los estaticos de la aplicacion en nuestro caso los `assets`
app.use(express.static(path.join(__dirname, 'assets')));

// Encoding para las tramas HTTP
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Quien resuelve y gestiona las url a través del controlador
var router = require('./modules/routers');
app.use(router);

// En el caso en que la url no sea conocida o resuelta
app.get('*', function(req, res) {
    res.status(405).send('Method not allowed');
});

server.listen(port, function(){
	console.log('Listen %d', port);
});
