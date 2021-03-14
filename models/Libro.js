// Libro.js
/** Clase que representa un libro */

// class Libro {
// 	constructor(id, titulo, genero, idioma, ISBN, paginas, publicacion, editorial) {
// 		this.id = id;
// 		this.titulo = titulo; // Nombre del libro
// 		this.genero = genero; // Genero literario de el libro
// 		this.idioma = idioma; // Idioma en el que esta escrito.
// 		this.isbn = ISBN; // International Standard Book Number
// 		this.paginas = paginas; // Número de paginas
// 		this.publicacion = publicacion; // Año de publicación
// 		this.editorial = editorial; // Nombre de la Editorial
// 	}
// }

// module.exports = Libro;

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