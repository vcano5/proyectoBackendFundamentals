var router = require('express').Router();

router.get('/', (req, res) => {
	res.send("welcome to proyectobackend api");
})

router.use('/libro', require('./libro'));


module.exports = router;