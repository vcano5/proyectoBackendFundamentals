const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = (sequelize, Sequelize) => {
    const Op = Sequelize.Op;
    const Usuario = sequelize.define("usuario", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: Sequelize.STRING,
		salt: Sequelize.STRING,
		status: Sequelize.STRING,
        hash: {
            type: Sequelize.STRING(1024),
        },
        rol: {
            type: Sequelize.STRING,
            defaultValue: 'Miembro'
        },
        vencimientoMembresia: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW

        }
    })

    Usuario.prototype.crearPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto
                    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
                    .toString('hex');
    }

    Usuario.prototype.validarPassword = function(password) {
        const hash = crypto
                        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
                        .toString('hex');
        //console.log(hash)
        return this.hash === hash;
    }

    Usuario.prototype.generarJWT = function() {
        const hoy = new Date();
        const expi = new Date(hoy);
        expi.setDate(hoy.getDate() + 7);

        return jwt.sign({
            id: this.idBibliotecario,
            nombre: this.nombre,
            exp: parseInt(expi.getTime() / 1000)
        }, process.env.SECRET);
    }

    Usuario.prototype.toAuthJSON = function() {
        return {
            nombre: this.nombre,
            id: this.id,
            token: this.generarJWT()
        }
    }

    Usuario.prototype.publicData = function() {
        return {
            id: this.id,
            nombre: this.nombre,
            createdAt: this.createdAt,
            updateAt: this.updateAt
        }
    }

    return Usuario
}