const router = require('express').Router();

const {getLibros, crearLibro, crearVariosLibros, borrarLibro, updateLibro} = require('../controllers/libro')

router.get('/', getLibros);
router.post('/', crearLibro);
router.post('/varios', crearVariosLibros)
router.put('/:ISBN', updateLibro);
router.delete('/:ISBN', borrarLibro);

module.exports = router;