// class Account{
//     constructor(id, password, status){
//         this.id = id;
//         this.password = password;
//         this.status = status;
//     }
// }

// class Librarian extends Account{
//     addBookItem(){}
//     blockMember(){}
//     unblockMember(){}
// }

// class User extends Account{
//     membership(){}
//     rentedBooks(){}
//     totalBooksRented(){}
// }


// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('mysql::memory');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const secret = require('../config').secret;

// const Usuario = sequelize.define('Usuario', {
// 	idMiembro: Sequelize.NUMBER,
// 	password: Sequelize.STRING,
//     estatus: Sequelize.STRING,
//     hash: Sequelize.STRING,
//     salt: Sequelize.STRING
// }, {
//     instanceMethods: {
//         generateHash(password) {
//             this.salt = crypto.randomBytes(16).toString('hex');
//             this.password = crypto
//                 .pbkdf2(password, this.salt, 1000, 512, "sha512")
//                 .toString('hex')
//         },
//         generarJWT() {
//             const hoy = new Date();
//             const exp = new Date(hoy);
//             exp.setDate(hoy.getDate() + 7);

//             return jwt.sign({
//                 id: this.idMiembro,
//                 exp: parsetInt(exp.getTime() / 1000)
//             }, secret)
//         },
//         toAuthJSON = function() {
//             return {
//                 id: this.idMiembro,
//                 token: this.generarJWT()
//             }
//         }
//     }
// }
// );
const crypto = require('crypto');
const jwt = require('express-jwt');



module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        idMiembro: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING
        },
        estatus: {
            type: Sequelize.STRING,
            defaultValue: 'ACTIVO'
        },
        salt: {
            type: Sequelize.STRING
        },
        username: Sequelize.STRING
    })

    Usuario.crearPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto
                        .pbkdf2(password, this.salt, 1000, 512, 'sha512')
                        .toString('hex');
    }

    Usuario.validarPassword = function(password) {
        const hash = crypto
                        .pbkdf2(password, this.salt, 1000, 512, 'sha512')
                        .toString('hex');
        return this.hash === hash;
    }

    Usuario.generarJWT = function() {
        const hoy = new Date();
        const expi = new Date(hoy);
        expi.setDate(hoy.getDate() + 7);

        return jwt.sign({
            id: this.idMiembro,
            username: this.username,
            exp: parseInt(expi.getTime() / 1000)
        }, process.env.SECRET);
    }

    Usuario.toAuthJSON = function() {
        return {
            username: this.username,
            id: this.idMiembro,
            token: this.generarJWT()
        }
    }

    Usuario.publicData = function() {
        return {
            id: this.idMiembro,
            username: this.username,
            createdAt: this.createdAt,
            updateAt: this.updateAt
        }
    }
}