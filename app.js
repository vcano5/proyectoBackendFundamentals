require('dotenv').config()

const express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./config/passport');


app.use('/v1', require('./routes'));

app.use(function(req, res, next) {
	var err = new Error('Not found');
	err.status = 404;
	next(err);
})


const db = require('./models');
var isDevelopment = process.env.NODE_ENV === "development"
db.sequelize.sync({force: isDevelopment}).then(() => {
	if(isDevelopment) console.log('Drop and re-sync db.')
});

// // Manejando los errores 404
// app.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
//   });

var server = app.listen((process.env.PORT || 3000), () => {
	console.log('Puerto: ' + server.address().port);
})