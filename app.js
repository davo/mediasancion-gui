/*
 * Module dependencies
 */
var express = require('express')
	, stylus = require('stylus')
	, routes = require('./routes')
	, http = require('http');

var app = express();

app.configure(function () {

	// Set port
	app.set('port', process.env.PORT || 3000);

	// Configure View engine
	app.set('views', __dirname + '/views')
	app.set('view engine', 'jade')

	app.use(express.favicon());

	// Configure LESS
	app.use(require('less-middleware')({ src: __dirname + '/public', compress: true }));
 	app.use(express.static(__dirname + '/public'));

	// Logger
	app.use(express.logger('dev'))

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/acerca', routes.acerca);
app.get('/proyectos', routes.proyectos);
app.get('/proyectos/:page_id', routes.proyectosPageId);
app.get('/legisladores', routes.legisladores);
app.get('/comisiones', routes.comisiones);
app.get('/proyecto/:project_id', routes.proyecto);

// Listener
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

