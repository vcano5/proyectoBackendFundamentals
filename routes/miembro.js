const router = require('express').Router();

const {
	iniciarSesion,
	cancelarMembresia,
	registro,
	obtenerUsuario
} = require('../controllers/Usuario')

// const {
// 	getLibro,
// 	getLibros
// } = require('../controllers/libro')

const auth = require('./auth');
const roles = require('./rol');

router.post('/registro', registro);
router.post('/cancelarMembresia', auth.requerido, roles, cancelarMembresia)
router.post('/entrar', iniciarSesion)
router.get('/', auth.requerido, roles, obtenerUsuario);

module.exports = router;