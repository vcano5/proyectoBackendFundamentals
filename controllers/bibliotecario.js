const db = require('../models');
const Bibliotecario = db.bibliotecario;
const Op = db.Sequelize.Op;

const crypto = require('crypto');

function registro(req, res, next) {
	const body = req.body;
	console.log(body)
	const password = body.password;

	delete body.password;

	const bibliotecario = Bibliotecario.build(body);
	bibliotecario.crearPassword(password);

	bibliotecario.save()
		.then(user => {
			return res.status(201).json(user.toAuthJSON())
		})
		.catch(next)
}

function obtenerBibliotecarios(req, res, next) {
	Bibliotecario.findAll({where: {idBibliotecario: req.usuario.id}})
		.then(r => {
			return res.json(r);
		})
		.catch(next)
}

function modificarBibliotecario(req, res, next) {
	console.log(req.usuario)
	Bibliotecario.findById(req.usuario.id).then(user => {
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
	  user.save().then(updatedUser => {                                   //Guardando usuario modificado en MongoDB.
		res.status(201).json(updatedUser.publicData())
	  }).catch(next)
	}).catch(next)
}




function eliminarBibliotecario(req, res) {
	// únicamente borra a su propio usuario obteniendo el id del token
	Bibliotecario.findOneAndDelete({ _id: req.usuario.id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
	  res.status(200).send(`Bibliotecario ${req.params.id} eliminado: ${r}`);
	})
  }
  
  function iniciarSesion(req, res, next) {
	if (!req.body.email) {
	  return res.status(422).json({ errors: { email: "no puede estar vacío" } });
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

// function iniciarSesion(req, res) {
// 	User.findOne({
// 		where: {
// 			username: req.body.username
// 		}
// 	})
// 	.then(user => {
// 		if(!user) return res.status(404).send({message: 'Miembro no encontrado'});

// 		var contrasenaBody = crypto.pbkdf2(req.body.password, user.salt, 1000, 512, 'sha512').toString('hex');
// 		if(contrasenaBody === user.password) {
// 			var token = jwt.sign({id: user.idMiembro}, process.env.SECRET, {
// 				expiresIn: (60*60*24*7) // 7 dias
// 			})
// 			res.status(200).send({id: user.idMiembro, accessToken: token});
// 		}
// 		else {
// 			return res.status(401).send({accessToken: null, message: 'Invalid password!'})
// 		}
// 	})
// }


module.exports = {
	registro,
  	obtenerBibliotecarios,
  	modificarBibliotecario,
  	eliminarBibliotecario,
  	iniciarSesion
}