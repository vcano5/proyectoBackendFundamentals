const db = require('../models');
const Bibliotecario = db.bibliotecario;

var roles = function (req, res, next) {
	var id = req.usuario.id;
	Bibliotecario.findByPk(id)
		.then(d => {
			res.locals.rol = d.rol;
			console.log(d.rol)
			next()
		})
		.catch(e => {
			console.log(e)
			next()
		}) 
  };

  module.exports = roles;