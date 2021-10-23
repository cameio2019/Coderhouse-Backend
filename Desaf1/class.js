class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName () {
        return `Hola, ${this.nombre} ${this.apellido}!`
    }

    addMascota (mascota) {
        this.mascotas.push(mascota);
    }

    countMascota () {
        return this.mascotas.length
    }

    addBook (nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
    }
    

    getBookNames () {
        return this.libros.map(libros => libros.nombre)
    }
}

const usuario = new Usuario('Eze', 'Arevalo',[], []);

console.log(usuario.getFullName());

usuario.countMascota() //retorna cantidad de mascotas
usuario.getBookNames() //obtengo nombre del libro
usuario.getFullName()//retorna nombre completo del usuario.
usuario.addBook('Aerodinamica', 'Juan Carmona')//Recibe un string nombre y autor y lo agrega  al array de libros del usuario.
usuario.addBook('Vuelo nocturno', 'Saint Exupery')
usuario.addMascota('Juano')//recibe un nombre y agrega una mascota al array de mascotas.
usuario.addMascota('Glan')

console.log(usuario);
console.log(usuario.countMascota());
console.log(usuario.getBookNames());
