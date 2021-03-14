
const db = require('../models');
const Libro = db.libro;
const Op = db.Sequelize.Op;

function getLibros(req, res) {
	// R: Regresa todos los libros
	Libro.findAll({}).then(data => {
		res.send(data);
	})
}

function getLibro(req, res) {
	// R: Regresa los libros que coincidan con los parametros dados
	var limite = 99999;
	if(req.query.limite !== undefined) {
		if(isNaN(req.query.limite)) {
			res.status(409).send({mensaje: 'El parametro limite no es un numero'})
			return
		}
		limite = parseInt(req.query.limite);
		delete req.query.limite
	}
	if(req.params == undefined) {
		res.send(409).send({mensaje: "Faltan parametros"})
	}
	var r = [];
	for(qK of Object.keys(req.query)) {
		r[r.length] = JSON.parse('{"' + qK + '": "' + req.query[qK] + '"}')
	}
	
	Libro.findAll({limit: limite, where: r})
		.then(data => {
			res.status(200).send(data)
		})
		.catch(err => {
			res.status(500).send({mensaje: "Algo salio al realizar la consulta", consulta: [...r]})
		})
}

function crearLibro(req, res) {
	// C: Crea un nuevo libro
	if(!req.body) {
		res.status(400).send({message: 'El contenido no puede estar vacio'})
		return;
	}
	const libro = {
		ISBN: req.body.ISBN,
		titulo: req.body.titulo,
		genero: req.body.genero,
		editorial: req.body.editorial, 
		paginas: req.body.paginas,
		publicacion: req.body.publicacion,
		idioma: req.body.idioma
	}
	Libro.create(libro)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Algo ocurrio al crear un nuevo Libro :("
			})
		})
}

function crearVariosLibros(req, res) {
	var recuento = 0;
	if(!req.body) {
		res.status(400).send({message: 'El contenido no puede estar vacio'})
		return;
	}
	if(req.body.length > 1) {
		var peticion = req.body;
		Libro.bulkCreate(peticion).then(data => {
			res.status(201).send({message: `Creados ${data.length} libros`})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Algo ocurrio al crear muchos libros'
			})
		})
	}
	const libro = {
		ISBN: req.body.ISBN,
		titulo: req.body.titulo,
		genero: req.body.genero,
		editorial: req.body.editorial, 
		paginas: req.body.paginas,
		publicacion: req.body.publicacion,
		idioma: req.body.idioma
	}
	Libro.create(libro)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Algo ocurrio al crear un nuevo Libro :("
			})
		})


}

function updateLibro(req, res) {
	// U: Actualiza un libro con el parametro ISBN
	const id = req.params.ISBN;
	Libro.update(req.body, {
		where: {ISBN: id}
	})
		.then(num => {
			if(num == 1) {
				res.send({
					message: "Libro actualizado correctamente."
				})
			}
			else {
				res.send({
					message: 'Cannot update Libro with ISBN=' + id + '. Maybe you are not authorized to perform that action.'
				})
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Error while updating Libro with ISB= ${id}`
			})
		})
}

function borrarLibro(req, res) {
	// D: Borra un libro con el parametro ISBN
	if(req.query.ISBN !== undefined) {
		Libro.destroy({where: {ISBN: req.params.ISBN}})
			.then(num => {
				if(num == 1) {
					res.send({
						message: `Libro con ISBN ${req.params.ISBN} eliminado correctamente`
					})
				}
			})
			.catch(err => {
				res.status(500).send({message: err.message})
			})
	} 
	else {
		res.status(400).send({mensaje: 'Falta el parametro ISBN'})
	}
	
}



module.exports = {
	getLibros,
	crearLibro,
	crearVariosLibros,
	borrarLibro,
	updateLibro,
	getLibro
}
