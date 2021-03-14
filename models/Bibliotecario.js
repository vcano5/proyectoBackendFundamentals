const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, Sequelize) => {
    const Bibliotecario = sequelize.define("bibliotecario", {
        idBibliotecario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: Sequelize.STRING,
		salt: Sequelize.STRING,
		status: Sequelize.STRING,
        hash: Sequelize.STRING
    })

    Bibliotecario.prototype.crearPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto
                    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
                    .toString('hex');
    }

    Bibliotecario.prototype.validarPassword = function(password) {
        const hash = crypto
                        .pbkdf2(password, this.salt, 10000, 512, 'sha512')
                        .toString('hex');
        return this.hash === hash;
    }

    Bibliotecario.prototype.generarJWT = function() {
        const hoy = new Date();
        const expi = new Date(hoy);
        expi.setDate(hoy.getDate() + 7);

        return jwt.sign({
            id: this.idBibliotecario,
            nombre: this.nombre,
            exp: parseInt(expi.getTime() / 1000)
        }, process.env.SECRET);
    }

    Bibliotecario.prototype.toAuthJSON = function() {
        return {
            username: this.username,
            id: this.idMiembro,
            token: this.generarJWT()
        }
    }

    Bibliotecario.prototype.publicData = function() {
        return {
            id: this.idBibliotecario,
            nombre: this.nombre,
            createdAt: this.createdAt,
            updateAt: this.updateAt
        }
    }

    return Bibliotecario
}