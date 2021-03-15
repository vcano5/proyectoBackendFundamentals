const router = require('express').Router();

const {
	iniciarSesion,
	renovarMembresia,
	cancelarMembresia,
	registro
} = require('../controllers/Usuario')

const {
	getLibro,
	getLibros
} = require('../controllers/libro')

//router.get('/', obtenerLibros);
router.post('/', registro);
//router.put('/:id', modificarLibro);
//router.delete('/:id', eliminarLibro);

module.exports = router;