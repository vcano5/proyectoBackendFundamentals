const Libro = require('../models/Libro');

function crearLibro(req, res) {
	var libro = new Libro(req.body);
	res.status(201).send(mascota)
}

function obtenerLibros(req, res) {
	var libro1 = new Libro(1,"Scrum: El arte de Hacer El Doble de Trabajo en La Mitad de Tiempo", "?", "Español", 220, "2016", "Océano");
	res.send([libro1]);
}

function modificarLibro(req, res) {
	var libro1 = new Libro(1,"Scrum: El arte de Hacer El Doble de Trabajo en La Mitad de Tiempo", "?", "Español", 220, "2016", "Océano");
	libro1 = {...libro1, ...req.body};
	res.send(libro1)
}

function eliminarLibro(req, res) {
	res.status(200).send(`Eliminado Libro con ID ${req.params.id}`)
}

module.exports = {
	crearLibro,
	obtenerLibros,
	modificarLibro,
	eliminarLibro
}