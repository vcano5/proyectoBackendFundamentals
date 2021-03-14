module.exports = (sequelize, Sequelize) => {
    const Catalogo = sequelize.define("catalogo", {
        idCatalogo: {
            type: Sequelize.STRING,
            primaryKey: true
        },
		idMiembro: Sequelize.INTEGER,
		cantidadLibros: Sequelize.INTEGER,
		tituloLibro: Sequelize.STRING,
		autoresLibros: Sequelize.STRING,
		genero: Sequelize.STRING,
        publicaciones: Sequelize.STRING
    })

    return Catalogo
}