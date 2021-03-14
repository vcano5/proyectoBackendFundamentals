const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const Bibliotecario = db.bibliotecario;
const Sequelize = require('sequelize');


passport.use(new LocalStrategy({
	usernameField: 'id',
	passwordField: 'password'
}, function(id, password, done) {
	Bibliotecario.findOne({idBibliotecario: id})
		.then(user => {
			//console.log(user)
			console.log(password)
			console.log(user.validarPassword(user.salt, password))
			if(!user || !user.validarPassword(user.salt, password)) {
				return done(null, false, {errors: {'email o contraseña': 'equivocados'}});
			}
			return done(null, user);
		})
		.catch(done);
}))