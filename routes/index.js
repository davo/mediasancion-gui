/*
* GET home page.
*/

exports.index = function(req, res){
  res.render('index', { title: 'Media Sanción | Inicio' });
};

exports.acerca = function(req, res){
  res.render('acerca', { title: 'Media Sanción | Acerca' });
};

