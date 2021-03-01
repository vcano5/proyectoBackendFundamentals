const router = require('express').Router();

const {crearLibro, obtenerLibros, modificarLibro, eliminarLibro} = require('../controllers/libro')

router.get('/', obtenerLibros);
router.post('/', crearLibro);
router.put('/:id', modificarLibro);
router.delete('/:id', eliminarLibro);

module.exports = router;