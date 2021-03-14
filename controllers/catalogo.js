const db = require('../models');
const Catalogo = db.catalogo;
const Op = db.Sequelize.Op;

const consultasValidas = ["tituloLibro", "autoresLibros", "genero", "publicaciones"]

function searchBy(req, res) {
	// Buscar por el parametro dado, parametros validos en consultasValidas[]
	var objkeys = Object.keys(req.query);
	if(objkeys.length > 0) {
		var valido = false;
		for(cV of consultasValidas) {
			if(objkeys[0] == cV) {
				valido = true;
			}
		}
		if(valido) {
			const k = objkeys[0];
			const v = req.query[k];
			var q = JSON.parse(`{"${k}": "${v}"}`);
			console.log(q)
			Catalogo.findAll({where: q})
				.then(data => {
					res.status(200).send(data)
				})
				.catch(err => {
					res.status(500).send({mensaje: 'Ocurrio un error al procesar tu solicitud', solicitud: q})
				})
		}
		else {
			res.status(501).send({mensaje: "Tipo no soportado", validas: consultasValidas})
		}
		
	}
	else {
		res.status(409).send({mensaje: "Faltan parametros"})
	}
}

function createCatalogo(req, res) {
	// Crear un nuevo catalogo recibiendo ids de libros

	if(req.body !== undefined) {
		Catalogo.create(req.body).then(data => {
			res.status(201).send(data)
		})
	}

}

function readCatalogo(req, res) {
	// R: obtener catalogo por el ID
	if(req.params.id !== undefined) {
		Catalogo.findByPk(req.query.id)
			.then(data => {
				res.send(data)
			})
			.catch(err => {
				res.status(500).send({mensaje: "Ocurrio un error realizar tu consulta", consulta: {id: req.query.id}})
			})
	}
}

function updateCatalogo(req, res) {
	// U: modificar catalogo por el ID
	if(req.body !== undefined) {
		Catalogo.update(req.body, {where: {idCatalogo: req.query.id}})
			.then(data => {
				res.status(201).send(data);
			})
			.catch(err => {
				res.status(500).send({mensaje: "Ocurrio un error realizar tu consulta", consulta: {id: req.query.id}})
			})
	}

}

function deleteCatalogo(req, res) {
	// D: Borrar catalogo al con ID de catalogo
	if(req.query.id !== undefined) {
		const id = req.query.id;
		Catalogo.destroy({where: {idCatalogo: id}})
			.then(afectados => {
				if(afectados == 1) {
					res.status(200).send({message: `Eliminado correctamente el catalogo con id:${id}`})
				}
			})
			.catch(err => {
				res.status(500).send({mensaje: "Ocurrio un error realizar tu consulta", consulta: {id: id}})
			})
	}
}




module.exports = {
	searchBy,
	createCatalogo,
	readCatalogo,
	updateCatalogo,
	deleteCatalogo
}
