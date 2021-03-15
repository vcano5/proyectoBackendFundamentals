var router = require('express').Router();

router.get('/', (req, res) => {
	res.send("welcome to proyectobackend api");
})

router.use('/libro', require('./libro'));
router.use('/miembros', require('./miembro'))
router.use('/catalogo', require('./catalogo'))
router.use('/bibliotecario', require('./bibliotecario'))

module.exports = router;