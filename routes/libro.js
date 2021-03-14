const router = require('express').Router();

const {getLibros, crearLibro, crearVariosLibros, borrarLibro, updateLibro, getLibro} = require('../controllers/libro')

router.get('/', getLibros);
router.post('/', crearLibro);
router.post('/varios', crearVariosLibros)
router.put('/:ISBN', updateLibro);
router.delete('/:ISBN', borrarLibro);
router.get('/a', getLibro);

module.exports = router;