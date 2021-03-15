const router = require('express').Router();

const {getLibros, crearLibro, crearVariosLibros, borrarLibro, updateLibro, getLibro} = require('../controllers/libro')

const roles = require('./rol');
const auth = require('./auth');

router.get('/:ISBN', auth.requerido, getLibro);							// R: Regresa el contenido de un libro
router.get('/', auth.requerido, getLibros); 							// R: Regresa todos los libros [registrados]
router.post('/', auth.requerido, roles, crearLibro);					// C: Crea un nuevo libro [bibliotecario]
router.post('/varios', auth.requerido, roles, crearVariosLibros)		// C: Crea un conjunto de libros [bibliotecario]
router.put('/:ISBN', auth.requerido, roles, updateLibro);				// U: Modifica el contenido de un libro [bibliotecario]
router.delete('/:ISBN', auth.requerido, roles, borrarLibro);			// D: Borra un libro [bibliotecario]

module.exports = router;