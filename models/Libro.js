module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define("libro", {
        ISBN: {
            type: Sequelize.STRING(20),
            primaryKey: true
        },
		titulo: Sequelize.STRING,
		genero: Sequelize.STRING,
		editorial: Sequelize.STRING,
		paginas: Sequelize.INTEGER,
		publicacion: Sequelize.INTEGER,
        idioma: Sequelize.STRING,
    })

    return Libro
}