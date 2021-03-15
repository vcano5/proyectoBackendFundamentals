const db = require('../models');
const Miembro = db.miembro;
const Op = db.Sequelize.Op;

const crypto = require('crypto');

function registro(req, res) {
	let salt = crypto.randomBytes(16).toString('hex');
	Miembro.create({
		username: req.body.username,
		password: miembro
	})

	.then(user => {
		res.send({message: 'Miembro registrado correctamente'});
	})

	// if(!req.body) {
	// 	res.status(400).send({
	// 		message: "El contenido no puede estar vacio"
	// 	});
	// 	return;
	// }

	// var miembro = {
	// 	username: req.body.username,
	// 	estatus: 'ACTIVO',
	// 	salt: crypto.randomBytes(16).toString('hex'),
	// 	// password: crypto
	// 	// 					.pbkdf2(req.body.password, miembro.salt, 1000, 512, "sha512")
	// 	// 					.toString('hex')


	// 	// password: crypto
    //     //    .pbkdf2(req.body.password, this.miembro.salt, 1000, 512, "sha512")
    //     //    .toString('hex')
	// 	//password: Miembro.generateHash(req.body.password)
	// }
	// console.log(miembro);
	
	// let hash = crypto.pbkdf2(req.body.password, miembro.salt, 1000, 512, "sha512")
	// 						.toString('hex');
	// miembro.password = hash;
	
	// console.log(miembro);
	// Miembro.create(miembro)
	// 	.then(data => {
	// 		res.send(data)
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message: err.message || 'Ocurrio algo mientras se creaba el nuevo usuario'
	// 		})
	// 	})
}

function iniciarSesion(req, res) {
	User.findOne({
		where: {
			username: req.body.username
		}
	})
	.then(user => {
		if(!user) return res.status(404).send({message: 'Miembro no encontrado'});

		var contrasenaBody = crypto.pbkdf2(req.body.password, user.salt, 1000, 512, 'sha512').toString('hex');
		if(contrasenaBody === user.password) {
			var token = jwt.sign({id: user.idMiembro}, process.env.SECRET, {
				expiresIn: (60*60*24*7) // 7 dias
			})
			res.status(200).send({id: user.idMiembro, accessToken: token});
		}
		else {
			return res.status(401).send({accessToken: null, message: 'Invalid password!'})
		}
	})
}


function findAll(req, res) {

}

function findOne(req, res) {

}

function update(req, res) {

}

function borrar(req, res) {

}

module.exports = {
	registro,
	iniciarSesion
}