CREATE DATABASE IF NOT EXISTS biblioteca_digital;
USE biblioteca_digital;

CREATE TABLE IF NOT EXISTS libro(
	ISBN CHAR(20) NOT NULL,
    titulo VARCHAR(250) NOT NULL,
    genero VARCHAR(50) NULL,
    editorial VARCHAR(100) NULL,
    paginas INT NOT NULL,
    publicacion VARCHAR(100) NULL,
    idioma VARCHAR(50) NOT NULL,    
    PRIMARY KEY(ISBN)
);

CREATE TABLE IF NOT EXISTS miembro(
	idMiembro INT NOT NULL,
    password VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    PRIMARY KEY(idMiembro)
);

CREATE TABLE IF NOT EXISTS catalogo(
	idCatalogo INT NOT NULL,
    idMiembro INT NOT NULL,
    cantidadLibros INT NOT NULL,
    tituloLibro VARCHAR(250) NOT NULL,
    autoresLibros VARCHAR(300) NOT NULL,
    genero VARCHAR(100) NULL,
    fechasPublicacion DATE NULL,
    PRIMARY KEY(idCatalogo),
    FOREIGN KEY(idMiembro) REFERENCES miembro(idMiembro)
);

CREATE TABLE IF NOT EXISTS bibliotecario(
	idBibliotecario INT NOT NULL,
    password VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    PRIMARY KEY(idBibliotecario)
);