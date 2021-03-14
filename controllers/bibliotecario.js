const db = require('../models');
const Bibliotecario = db.bibliotecario;
const Op = db.Sequelize.Op;

const crypto = require('crypto');

function registro(req, res) {
	let salt = crypto.randomBytes(16).toString('hex');
	Bibliotecario.create({
		nombre: req.body.nombre,
		password: req.body.password
	})

	.then(user => {
		res.send({message: 'Miembro registrado correctamente'});
	})
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