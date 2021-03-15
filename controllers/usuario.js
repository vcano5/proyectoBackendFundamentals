const db = require('../models');
const Usuario = db.usuario;
const Op = db.Sequelize.Op;
const passport = require('passport');
const moment = require('moment');

const crypto = require('crypto');

function registro(req, res, next) {
	const body = req.body;
	const password = body.password;
	delete body.password;

	const usuario = Usuario.build(body);
	usuario.crearPassword(password);
	usuario.save()
		.then(user => {
			return res.status(201).json(user.toAuthJSON())
		})
		.catch(next)
}

function obtenerUsuario(req, res, next) {
	if(res.locals.rol === "Bibliotecario" || res.locals.rol === "Miembro") {
		Usuario.findAll({where: {id: req.usuario.id}})
		.then(r => {
			return res.json(r);
		})
		.catch(next)
	}
	else {
		res.status(403).send({mensaje: 'No has especificado el token de autentificación o no tienes permisos para realizar esa acción.'})
	}
	
}

function modificarUsuario(req, res, next) {
	if(res.locals.rol === "Bibliotecario" || res.locals.rol === "Miembro") {
		Usuario.findById(req.usuario.id).then(user => {
			if (!user) { return res.sendStatus(401); }
			let nuevaInfo = req.body
			if (typeof nuevaInfo.nombre !== 'undefined')
			  user.nombre = nuevaInfo.nombre
	  
			if (typeof nuevaInfo.status !== 'undefined')
			  user.status = nuevaInfo.status
	  
			if (typeof nuevaInfo.password !== 'undefined')
			  user.crearPassword(nuevaInfo.password)
			user.save()
				.then(updatedUser => {
			  		res.status(201).json(updatedUser.publicData())
				})
				.catch(next)
		  })
		  .catch(next)
	}
	else {
		res.status(403).send({mensaje: 'No has especificado el token de autentificación o no tienes permisos para realizar esa acción.'})
	}
	
}

function eliminarUsuario(req, res) {
	if(res.locals.rol === "Bibliotecario") {
		Usuario.findOneAndDelete({ _id: req.usuario.id }).then(r => { 
			res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
		})
	}
	else {
		res.status(403).send({mensaje: 'No has especificado el token de autentificación o no tienes permisos para realizar esa acción.'})
	}
  }
  
function iniciarSesion(req, res, next) {
	if (!req.body.id) {
		return res.status(422).json({ errors: {id: "no puede estar vacío" } });
	  }
	
	  if (!req.body.password) {
		return res.status(422).json({ errors: { password: "no puede estar vacío" } });
	  }
	
	  passport.authenticate('local', { session: false }, function (err, user, info) {
		if (err) { return next(err); }
	
		if (user) {
		  user.token = user.generarJWT();
		  return res.json({ user: user.toAuthJSON() });
		} else {
		  return res.status(422).json(info);
		}
	  })(req, res, next);
}

//res.status(403).send({mensaje: 'No has especificado el token de autentificación o no tienes permisos para realizar esa acción.'})

function extenderMembresia(req, res, next) {
	if(res.locals.rol === "Bibliotecario") {
		const id = req.body.id;
		Usuario.findOne({where: {id: id}})
			.then(user => {
				var nuevoUsuario = user;
				var vencimiento = new Date(nuevoUsuario.vencimientoMembresia);
				var expiracion = new Date(vencimiento);
				expiracion.setDate(vencimiento.getDate() + 30);
				nuevoUsuario.vencimientoMembresia = expiracion;
				Usuario.update(nuevoUsuario, {where: {id: id}})
					.then(resultado => {
						res.status(201).send({mensaje: `Nuevo vencimiento ${expiracion}` })
					})
					.catch(err => {
						res.status(400).send({mensaje: "Ocurrio un error al procesar tu solicitud"})
					})

			})
			.catch(err => {
				res.status(500).send({mensaje: 'El id especificado no existe'})
			})
	}
	else {
		res.status(403).send({mensaje: 'No has especificado el token de autentificación o no tienes permisos para realizar esa acción.'})
	}
}

function cancelarMembresia(req, res, next) {
	if(res.locals.rol === "Bibliotecario") {
		Usuario.findOne({where: {id: req.body.id}})
		.then(user => {
			var hoy = new Date();
			user.vencimientoMembresia = hoy;
			Usuario.update(user, {where: {id: req.body.id}})
				.then(resultado => {
					res.status(201).send({mensaje: `Se cancelo correctamtente la membresia de ${user.id}`})
				})
				.catch(err => {
					res.status(500).send({mensaje: `Algo salio mal al cancelar la membresia del usuario ${user.id}`})
				})
		})
		.catch(err => {
			res.status(500).send({mensaje: 'Ocurrio un error al procesar tu solicitud', error: err.message})
		})
	}
	else {
		Usuario.findOne({where: {nombre: req.usuario.nombre}})
			.then(user => {
				if(user.id === req.body.id) {
					Usuario.findOne({where: {id: req.body.id}})
						.then(user => {
							var hoy = new Date();
							user.vencimientoMembresia = hoy;
							Usuario.update(user, {where: {id: req.body.id}})
								.then(resultado => {
									res.status(201).send({mensaje: `Se cancelo correctamtente la membresia de ${user.id}`})
								})
								.catch(err => {
									res.status(500).send({mensaje: `Algo salio mal al cancelar la membresia del usuario ${user.id}`})
								})
						})
						.catch(err => {
							res.status(500).send({mensaje: 'Ocurrio un error al procesar tu solicitud', error: err.message})
						})
				}
				else {
					res.status(403).send({mensaje: 'No has especificado el token de autentificación o no tienes permisos para realizar esa acción.'})
				}
				
			})
			.catch(err =>  {
				res.status(500).send({mensaje: "Ocurrio un error al realizar tu solicitud."})
			})
	}
}

module.exports = {
	registro,
  	obtenerUsuario,
	modificarUsuario,
	eliminarUsuario,
  	iniciarSesion,
	extenderMembresia,
	cancelarMembresia
}