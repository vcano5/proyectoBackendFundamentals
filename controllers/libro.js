
const db = require('../models');
const Libro = db.libro;
const Op = db.Sequelize.Op;

function getLibros(req, res) {
	Libro.findAll({}).then(data => {
		res.send(data);
	})
}

function crearLibro(req, res) {
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
			//console.log(data.length)
			res.status(201).send({message: `Creados ${data.length} libros`})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Algo ocurrio al crear muchos libros'
			})
		})
		// peticion.forEach(libro => {

		
		// 	console.log(libro)
		// 	Libro.create(libro)
		// 	.then(data => {
		// 		recuento++;
		// 		//res.send(data);
		// 	})
		// 	.catch(err => {
		// 		res.status(500).send({
		// 			message: err.message || "Algo ocurrio al crear un nuevo Libro :("
		// 		})
		// 	})
		// })
		
		//res.status(201).send({message: `Creados ${recuento} libros`})
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



module.exports = {
	getLibros,
	crearLibro,
	crearVariosLibros,
	borrarLibro,
	updateLibro
}
