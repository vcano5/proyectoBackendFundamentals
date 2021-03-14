const crypto = require('crypto');
const jwt = require('express-jwt');

module.exports = (sequelize, Sequelize) => {
    const Bibliotecario = sequelize.define("bibliotecario", {
        idBibliotecario: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre: Sequelize.STRING,
		password: Sequelize.STRING,
		salt: Sequelize.STRING,
		status: Sequelize.STRING
    })

    Bibliotecario.crearPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto
                        .pbkdf2(password, this.salt, 1000, 512, 'sha512')
                        .toString('hex');
    }

    Bibliotecario.validarPassword = function(password) {
        const hash = crypto
                        .pbkdf2(password, this.salt, 1000, 512, 'sha512')
                        .toString('hex');
        return this.hash === hash;
    }

    Bibliotecario.generarJWT = function() {
        const hoy = new Date();
        const expi = new Date(hoy);
        expi.setDate(hoy.getDate() + 7);

        return jwt.sign({
            id: this.idBibliotecario,
            nombre: this.nombre,
            exp: parseInt(expi.getTime() / 1000)
        }, process.env.SECRET);
    }

    Bibliotecario.toAuthJSON = function() {
        return {
            username: this.username,
            id: this.idMiembro,
            token: this.generarJWT()
        }
    }

    Bibliotecario.publicData = function() {
        return {
            id: this.idBibliotecario,
            nombre: this.nombre,
            createdAt: this.createdAt,
            updateAt: this.updateAt
        }
    }
}