const router = require('express').Router();

const {getLibros, crearLibro, crearVariosLibros, borrarLibro, updateLibro, getLibro} = require('../controllers/libro')

const roles = require('./rol');
const auth = require('./auth');

router.get('/', auth.requerido, getLibros);
router.post('/', auth.requerido, roles, crearLibro);
router.post('/varios', auth.requerido, roles, crearVariosLibros)
router.put('/:ISBN', auth.requerido, roles, updateLibro);
router.delete('/:ISBN', auth.requerido, roles, borrarLibro);
router.get('/:ISBN', auth.requerido, getLibro);

module.exports = router;