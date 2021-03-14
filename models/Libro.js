module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define("libro", {
        ISBN: {
            type: Sequelize.STRING,
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