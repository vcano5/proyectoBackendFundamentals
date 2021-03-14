const router = require('express').Router();

const { registro,
	obtenerBibliotecarios,
	modificarBibliotecario,
	eliminarBibliotecario,
	iniciarSesion } = require('../controllers/bibliotecario')

const auth = require('./auth');

const roles = require('./rol');

// router.get('/', searchBy);

router.get('/', auth.requerido, roles, obtenerBibliotecarios);
router.get('/:id', auth.requerido, obtenerBibliotecarios);
router.post('/',auth.opcional , registro);
router.post('/entrar', iniciarSesion);
router.put('/:id', auth.requerido, modificarBibliotecario);
router.delete('/:id', auth.requerido, eliminarBibliotecario)

module.exports = router;