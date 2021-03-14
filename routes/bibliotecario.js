const router = require('express').Router();

const { searchBy } = require('../controllers/catalogo')

router.get('/', searchBy);


module.exports = router;