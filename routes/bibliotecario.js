const router = require('express').Router();

const { 
	iniciarSesion,
	eliminarUsuario, 
	extenderMembresia,
	cancelarMembresia
	} = require('../controllers/Usuario')

const {
	crearLibro,
	crearVariosLibros,
	borrarLibro,
	updateLibro,
	} = require('../controllers/libro')


const auth = require('./auth');

const roles = require('./rol');


router.post('/entrar', iniciarSesion); 											// Iniciar sesión

router.post('/libro', auth.requerido, roles, crearLibro);						// Agregar libro
router.post('/libros', auth.requerido, roles, crearVariosLibros);				// Agregar libros

router.put('/libro', auth.requerido, roles, updateLibro);						// Editar libro

router.delete('/libro', auth.requerido, roles, borrarLibro);					// Eliminar libro


router.delete('/miembro', auth.requerido, roles, eliminarUsuario)				// Eliminar Miembro

router.post('/extenderMembresia', auth.requerido, roles, extenderMembresia) 	// Extender membresia con el ID
router.post('/cancelarMembresia', auth.requerido, roles, cancelarMembresia) 	// Cancelar membresia con el ID

module.exports = router;