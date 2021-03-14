// class catalog{
//     constructor(title, author, subject, publicationDate){
//         this.title = title;
//         this.author = author;
//         this.subject = subject;
//         this.publicationDate = publicationDate;
//     }

// //metodos
//     searchByTitle(){
//         return `${this.title}`
//     }
//     searchByAuthor(){
//         return `${this.author}`
//     }
//     searchBySubject(){
//         return `${this.subject}`
//     }
//     searchByPublishDate(){
//         return `${this.publicationDate}`
//     }
// }

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
}