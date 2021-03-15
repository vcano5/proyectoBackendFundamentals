const router = require('express').Router();

const usuarios = require('../controllers/Usuario')

//router.get('/', obtenerLibros);
router.post('/', usuarios.registro);
//router.put('/:id', modificarLibro);
//router.delete('/:id', eliminarLibro);

module.exports = router;