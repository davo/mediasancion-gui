
/*
 * Module dependencies
 */

var request = require('superagent'),
    qs = require('querystring'),
    fs = require('fs');
var projectList, projectUniqueId;

var projectList = 'http://198.74.50.217:8011/api/0/proyectos/?format=json&fields=tipo,sumario,comisiones.nombre,publicacion_fecha,camara_origen,firmantes,texto_mediasancion_senadores_url,texto_mediasancion_diputados_url,publicacion_en&paginate_by=99';

var projectListPage = function(id){ 
  return 'http://198.74.50.217:8011/api/0/proyectos/?page='+id+'&format=json&fields=sumario,comisiones.nombre,publicacion_fecha&paginate_by=99';
};

var projectSearchKeyword = function(keyword){ 
  return 'http://198.74.50.217:8011/api/0/proyectos/?fields=publicacion_fecha,sumario&name='+keyword+'&format=json&paginate_by=99';
};

var projectUniqueId = function(uuid){ 
  return 'http://198.74.50.217:8011/api/0/proyectos/'+uuid+'/?format=json';
};

var searchProjects = function(field,keys) {
	return 'http://198.74.50.217:8011/api/0/proyectos/?format=json&'+field+'='+keys+'&fields=sumario,comisiones.nombre,publicacion_fecha&paginate_by=99';
};

var legislatorsList = 'http://198.74.50.217:8011/api/0/legisladores/?format=json&fields=persona.nombre,persona.apellido&paginate_by=99';

var comissionsList = 'http://198.74.50.217:8011/api/0/comisiones/?format=json&fields=nombre&paginate_by=99';

var legislatorViewUniqueId = function(uuid){ 
  return 'http://198.74.50.217:8011/api/0/legisladores/'+uuid+'?format=json&fields=persona.nombre,persona.apellido';
};

/*

 GET Home page.

*/

exports.index = function(req, res){
  res.render('index', { title: 'Media Sanción | Inicio' });
};

exports.acerca = function(req, res){
  res.render('acerca', { title: 'Media Sanción | Acerca' });
};

// exports.proyectos = function(req, res){
//   fs.readFile(__dirname + '/../data/proyecto-list.json', 'utf-8', function(err, data){
//     data = JSON.parse(data);
//     res.render('proyectos', { title: 'Media Sanción | Proyectos', proyectos: data });
//   });
// };

exports.proyectos = function(req, res){
  request(projectList, function(resp){
    //console.dir(resp.body.payload.proyectos),
  	res.render('proyectos', { title: 'Media Sanción | Proyectos', proyectos: resp.body , qs_parse: qs.parse });
  });
};

exports.proyectosPageId = function(req, res){
  request(projectListPage(req.params.page_id), function(resp){	
    res.render('proyectos', { title: 'Media Sanción | Proyectos', proyectos: resp.body, qs_parse: qs.parse });
  });
};

exports.proyecto = function(req, res){  
  request(projectUniqueId(req.params.project_id), function(resp){ 
  	res.render('proyecto', { title: 'Media Sanción | Proyectos', proyecto: resp.body });
  });
};

exports.legislador = function(req, res){

  request(legislatorViewUniqueId(req.params.legislator_id), function(resp){ 
    console.log(resp.body.payload.legislador),
    res.render('legislador', { title: 'Media Sanción | Legislador', legislador: resp.body });
  });

};


exports.legisladores = function(req, res){
  fs.readFile(__dirname + '/../data/legislador-complete-list.json', 'utf-8', function(err, data){
    data = JSON.parse(data);
    res.render('legisladores', { title: 'Media Sanción | Legisladores', legisladores: data });
  });
};


// exports.legisladores = function(req, res){
//   request(legislatorsList, function(resp){
//     res.locals.legisladores = resp.body,
//     res.render('legisladores', {title: 'Media Sanción | Legisladores'});
//   });
// };

exports.comisiones = function(req, res){
  request(comissionsList, function(resp){
    res.render('comisiones', { title: 'Media Sanción | Comisiones', comisiones: resp.body });
  });
};

exports.search = function(req, res) {
	request(searchProjects(req.query.cat,req.query.q), function(resp) {
    //console.log(resp.req.path)
    res.render('proyectos', { title: 'Media Sanción | Proyectos', proyectos: resp.body, qs_parse: qs.parse });
	});
};
