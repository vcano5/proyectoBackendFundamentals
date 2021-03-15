const router = require('express').Router();

const { searchBy } = require('../controllers/catalogo');
const { getLibros } = require('../controllers/libro');

router.get('/search', searchBy); 		// R: Buscar por
router.get('/', getLibros)				// R: Ver todos los libros

module.exports = router;