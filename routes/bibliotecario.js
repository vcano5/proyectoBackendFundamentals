const router = require('express').Router();

const { 
	iniciarSesion,
	eliminarUsuario, 
	extenderMembresia,
	cancelarMembresia
	} = require('../controllers/Usuario')

const {
	getLibros,
	crearLibro,
	crearVariosLibros,
	borrarLibro,
	updateLibro,
	getLibro
	} = require('../controllers/libro')


const auth = require('./auth');

const roles = require('./rol');


router.post('/entrar', iniciarSesion); 		// Iniciar sesión


router.post('/libro', crearLibro);			// Agregar libro
router.post('/libros', crearVariosLibros);	// Agregar libros

router.put('/libro', updateLibro);			// Editar libro

router.delete('/libro', borrarLibro);		// Eliminar libro


router.delete('/miembro', eliminarUsuario)	// Eliminar Miembro


router.post('/extenderMembresia', extenderMembresia) // Extender membresia con el ID
router.post('/cancelarMembresia', cancelarMembresia) // Cancelar membresia con el ID

module.exports = router;