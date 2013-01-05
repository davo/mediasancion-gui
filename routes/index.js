
/*
 * Module dependencies
 */

//var fs = require('fs');
var request = require('superagent');
var projectList, projectUniqueId;

var projectList = 'http://198.74.50.217:8011/api/0/proyectos/?fields=publicacion_fecha,sumario&format=json';

var projectListPage = function(id){ 
  return 'http://198.74.50.217:8011/api/0/proyectos/?fields=publicacion_fecha,sumario&page='+id+'&format=json';
};

var projectUniqueId = function(uuid){ 
  return 'http://198.74.50.217:8011/api/0/proyectos/'+uuid+'/?format=json';
};

var legislatorsList = 'http://198.74.50.217:8011/api/0/legisladores/?format=json';

var comissionsList = 'http://198.74.50.217:8011/api/0/comisiones/?format=json';


/*
* GET home page.
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
  	res.render('proyectos', { title: 'Media Sanción | Proyectos', proyectos: resp.body });
  });
};

exports.proyectosPageId = function(req, res){
  request(projectListPage(req.params.page_id), function(resp){
  	res.render('proyectos', { title: 'Media Sanción | Proyectos', proyectos: resp.body });
  });
};

exports.proyecto = function(req, res){
  request(projectUniqueId(req.params.project_id), function(resp){
  	res.render('proyecto', { title: 'Media Sanción | Proyectos', proyecto: resp.body });
  });
};

exports.legisladores = function(req, res){
  request(legislatorsList, function(resp){
    res.render('legisladores', { title: 'Media Sanción | Legisladores', legisladores: resp.body });
  });
};

exports.comisiones = function(req, res){
  request(comissionsList, function(resp){
    res.render('comsiones', { title: 'Media Sanción | Comisiones', comsiones: resp.body });
  });
};
