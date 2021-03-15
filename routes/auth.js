const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeader(req) {
	const rHA = req.headers.authorization;
	if(rHA && rHA.split(' ')[0] == 'Token' || rHA && rHA.split(' ')[0] == 'Bearer') {
		return rHA.split(' ')[1];
	}
	return null;
}

const auth = {
	requerido: jwt({
		secret: secret,
		algorithms: ['HS256'],
		userProperty: 'usuario',
		getToken: getTokenFromHeader
	}),
	opcional: jwt({
		secret: secret,
		algorithms: ['HS256'],
		userProperty: 'usuario',
		credentialsRequired: false,
		getToken: getTokenFromHeader
	})
}

module.exports = auth;