const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
  
	pool: {
	  max: 5,
	  min: 0,
	  idle: 10000
	},
	//logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.catalogo = require('./Catalogo.js')(sequelize, Sequelize);
db.libro = require('./Libro.js')(sequelize, Sequelize);
db.usuario = require('./Usuario.js')(sequelize, Sequelize);

module.exports = db;