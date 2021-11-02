const fs = require('fs');
const save = require('../db');

class Contenedor {
    async crearProducto(prod){
        try{
            let data = await fs.promises.readFile('./Files/products.txt', 'utf-8')
            let products = JSON.parse(data);
            if(products.some(prd=>prd.title===prod.title)){
                return {status:"error",message:"El producto ya existe."}
            }else{
                let prObj = {
                    id:save(8),
                    title:prod.title,
                    price:prod.price,
                    thumbnail:prod.thumbnail
                }
                products.push(prObj);
                try{
                    await fs.promises.writeFile('./Files/products.txt',
                    JSON.stringify(products,null,2));
                    return {status:"success",message:"Producto Creado exitosamente."}
                }catch(err){
                    return {status:"error",message:"El producto no pudo ser creado."}
                }
            }    
        }catch{
            let prObj = {
                id:save(8),
                title:prod.title,
                price:prod.price,
                thumbnail:prod.thumbnail
            }
            try{
                await fs.promises.writeFile('./Files/products.txt',
                JSON.stringify([prObj],null,2))
                    return {status:"success",message:"Producto Creado exitosamente."}
                }catch(err){
                    return {status:"error",message:"El producto no pudo ser creado."+error}
                }
            }    
        }
        async getAll(){
            try{
                let data = await fs.promises.readFile('./Files/products.txt','utf-8')
                let products = JSON.parse(data);
                let product = products.map(prd=>prd);
                if(product){
                    return {status:"success",product:product}
                }else{
                    return {status:"error",product:null,message:"Info NO obtenida."}
                }
            }catch(err){
                return {status:"error",message:"No se procesar la solicitud."+err}
            }
        }
        async getById(id){
            try{
                let data = await fs.promises.readFile('./Files/products.txt','utf-8')
                let products = JSON.parse(data);
                let product = products.find(prd=>prd.id===id);
                if(product){
                    return {status:"success",product:product}
                }else{
                    return {status:"error",product:null,message:"Producto no encontrado"}
                }
            }catch(err){
                return {status:"error",message:"No se encontro el producto."}
            }
        }
        async deleteAll(){
            try{
                await fs.promises.unlink('./Files/products.txt')
                return {status:"success",message:"Objetos elimiandos."}
            }catch(error){
                return {status:"error",message:"No se encuentran los objetos."+error}
            }
        }
        async deleteById(id){
            try{
                let data = await fs.promises.readFile('./Files/products.txt','utf-8')
                let products = JSON.parse(data);
                let product = products.find(prod => prod.id === id)
                if(product){
                    await fs.promises.unlink(`${id}`)
                    return {status:"success",message:`Producto "${id}" eliminando.`}
                }
            }catch(error){
                return {status:"error",message:`No se encuentra el Producto con el ID "${id}" del producto.`+error}
            }
        }
}

module.exports = Contenedor;


