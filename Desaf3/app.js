const Contenedor = require('./classes/Class');

const contenedor = new Contenedor();

//Nota importante: para que se puedan ejecutar en forma correcta los metodos, llamarlos de uno por vez.    

//Crear un producto

// contenedor.crearProducto({title:'Gel',price:5000,thumbnail:'https://i.ibb.co/Q8gdBj4/Shampoo-Inforcer.jpg'}).then(result=>{
//     console.log(result.message);
// })

// //Elimina del archivo el objeto con el ID buscado.

contenedor.deleteById('mpDUqHaZ').then(result=>{
    console.log(result.message);
})

//Elimina todos los objetos presentes en el archivo.

// contenedor.deleteAll().then(result=>{
//     console.log(result.message);
// })

//Recibe un ID y devuelve el objeto de ese ID

// contenedor.getById('mpDUqHaZ').then(result=>{
//     console.log(result.product);
// })

//Devuelve un Array con todos los objetos.

// contenedor.getAll().then(result=>{
//     console.log(result.product);
// })


