# BibliotecaAPI
Esta es nuestra implementacion de lo aprendido en el modulo 3, nuestra API permite manejar una biblioteca.

Temática del proyecto: Sistema de gestión (como administrador) y acceso (como usuario)
de una biblioteca digital

#### Requerimientos y estructural del proyecto
- ¿Qué espero que haga el proyecto?

	_Implementar las funciones de una biblioteca digital; para los usuarios con
membresía: buscar libros, y acceder a su contenido, para el administrador
(bibliotecario): gestionar los libros y las relaciones de los miembros con la
biblioteca_
<br/>
- ¿Qué tipos de usuario tendrá nuestro sistema?

	Bibliotecario
	Miembro
	Usuario no registrado
<br/>
- ¿Qué acciones puede realizar cada usuario?

	Bibliotecario: 
	- Iniciar sesión
	- Agregar libros
	- Editar los atributos de los libros
	- Eliminar libros
	- Eliminar miembros
	- Renovar membresias
	- Cancelar membresias

	Miembro: 
	- Iniciar/cerrar sesión
	- Buscar en el catálogo de libros
	- Acceder al contenido de los libros
	- Cancelar membresia

	Usuarios no registrados
	- Registrarse
<br>
- ¿Qué información se necesita?

Por parte del bibliotecario y el usuario con membresia: nombre de usuario y contraseña
<br>
- ¿Cuáles son las principales entidades?

Cuenta, libro, catalogo
<br>
- ¿Qué caracteristicas tiene cada entidad?

	- Cuenta: Existiran dos tipos de cuenta en el sistema una de miembro y la otra sera de usuario
		Atributos: ID, contraseña, estatus (activo/no activo)
	- Catalogo: Los catalogos contienen una lista de libros ordenados segun criterios (autor, tema, fecha de publicacion, etc).
		Atributos: Cantidad de libros, titulos de libros, autores de libros, temas de libros, fechas de publicación.
	- Libro
		Atributos: ISBN, titulo, genero, idioma, número de páginas, fecha de publicación.
<br>
- ¿Que funcionalidades tiene cada entidad?

	- Cuenta: dar un tipo de acceso al sistema
	- Catalogo: devolver informacion de los libros que coincidan con el criterio de busqueda dado por el usuario

#### Modelo ER
![Modelo ER](https://raw.githubusercontent.com/vcano5/proyectoBackendFundamentals/docs/imgs/modelo_er.jpeg)

#### Modelo relacional
![Modelo relacional](https://raw.githubusercontent.com/vcano5/proyectoBackendFundamentals/docs/imgs/modelo_relacional.jpeg)

#### Postwork sesion 5 ####
![](https://raw.githubusercontent.com/vcano5/proyectoBackendFundamentals/docs/imgs/postwork5_1.jpeg)
![](https://raw.githubusercontent.com/vcano5/proyectoBackendFundamentals/docs/imgs/postwork5_1.jpeg)


#### Pre-requisitos
>Node.js
>Una base de datos relacional

#### Librerias
- CORS
- bodyparser
- express
- express-jwt
- jsonwebtoken
- mysql2
- passport
- Sequelize


#### Ejecutar localmente
1. Clona este repositorio con
> git clone https://github.com/vcano5/proyectoBackendFundamentals.git

2. 
>cd proyectoBackendFundamentals

3. 
>npm install

4. Configurar datos de entorno
> EXPORT variable=valor

5. Ejecutar el proyecto
> npm run start

#### Equipo 3