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
	//console.log("LOCALS: " + JSON.stringify(res.locals))
	Usuario.findAll({where: {id: req.usuario.id}})
		.then(r => {
			return res.json(r);
		})
		.catch(next)
}

function modificarUsuario(req, res, next) {
	console.log(req.usuario)
	Usuario.findById(req.usuario.id).then(user => {
	  if (!user) { return res.sendStatus(401); }
	  let nuevaInfo = req.body
	  if (typeof nuevaInfo.username !== 'undefined')
		user.username = nuevaInfo.username
	  if (typeof nuevaInfo.bio !== 'undefined')
		user.bio = nuevaInfo.bio
	  if (typeof nuevaInfo.foto !== 'undefined')
		user.foto = nuevaInfo.foto
	  if (typeof nuevaInfo.ubicacion !== 'undefined')
		user.ubicacion = nuevaInfo.ubicacion
	  if (typeof nuevaInfo.telefono !== 'undefined')
		user.telefono = nuevaInfo.telefono
	  if (typeof nuevaInfo.password !== 'undefined')
		user.crearPassword(nuevaInfo.password)
	  user.save().then(updatedUser => {
		res.status(201).json(updatedUser.publicData())
	  }).catch(next)
	}).catch(next)
}

function eliminarUsuario(req, res) {
	Usuario.findOneAndDelete({ _id: req.usuario.id }).then(r => { 
	  res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
	})
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

function extenderMembresia(req, res, next) {
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
					//console.log(resultado)
					res.status(201).send({mensaje: `Nuevo vencimiento ${expiracion}` })
				})
				.catch(err => {
					res.status(500).send({mensaje: "Algo salio mal"})
				})

		})
		.catch(err => {
			res.status(500).send({mensaje: 'Ocurrio un error ineseprado'})
		})
}

function cancelarMembresia(req, res, next) {
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
			res.status(500).send({mensaje: 'Ocurrio un error al procesar tu solicitud'})
		})
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