module.exports = (sequelize, Sequelize) => {
    const Bibliotecario = sequelize.define("bibliotecario", {
        idBibliotecario: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
		password: Sequelize.STRING,
		salt: Sequelize.STRING,
		status: Sequelize.STRING
    })
}