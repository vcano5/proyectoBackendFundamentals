const db = require('../models');
const Usuario = db.usuario;

var roles = function (req, res, next) {
	var id = req.usuario.nombre;
	Usuario.findOne({where: {nombre: id}})
		.then(d => {
			res.locals.rol = d.rol;
			next()
		})
		.catch(e => {
			console.error(`Ocurrio un error al solicitar el rol ${e}`)
			next()
		}) 
  };

  module.exports = roles;