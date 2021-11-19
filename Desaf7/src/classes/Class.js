const fs = require('fs');
// const save = require('../db');

class Contenedor {
    async crearProducto(prod){
        try{
            let data = await fs.promises.readFile('./Files/products.txt','utf-8');
            let products = JSON.parse(data);
            let id = products[products.length-1].id+1;
    
            product =Object.assign({id:id},prod);
            products.push(prod)
            try{
                await fs.promises.writeFile('./Files/products.txt',JSON.stringify(products,null,2));
                return {status:"success",message:"Producto registrado."}
            }catch{
                return {statis:"error",message:"Producto No Registrado."} 
            }
        }catch{
    
            prod = Object.assign({id:1},prod)
            try{
                await fs.promises.writeFile('./Files/products.txt',JSON.stringify([prod],null,2));
                return {status:"success", message:"Producto registrado gracias :)"}
            }
            catch{
                return {status:"error",message:"Producto No Registrado."}
            }
        }

        // try{
        //     let data = await fs.promises.readFile('./Files/products.txt', 'utf-8')
        //     let products = JSON.parse(data);
        //     if(products.some(prd=>prd.title===prod.title)){
        //         return {status:"error",message:"El producto ya existe."}
        //     }else{
        //         let prObj = {
        //             id:save(8),
        //             title:prod.title,
        //             price:prod.price,
        //             thumbnail:prod.thumbnail
        //         }
        //         products.push(prObj);
        //         try{
        //             await fs.promises.writeFile('./Files/products.txt',
        //             JSON.stringify(products,null,2));
        //             return {status:"success",message:"Producto Creado exitosamente."}
        //         }catch(err){    
        //             return {status:"error",message:"El producto no pudo ser creado."}
        //         }
        //     }    
        // }catch{
        //     let prObj = {
        //         id:save(8),
        //         title:prod.title,
        //         price:prod.price,
        //         thumbnail:prod.thumbnail
        //     }
        //     try{
        //         await fs.promises.writeFile('./Files/products.txt',
        //         JSON.stringify([prObj],null,2))
        //             return {status:"success",message:"Producto Creado exitosamente."}
        //         }catch(err){
        //             return {status:"error",message:"El producto no pudo ser creado."+error}
        //         }
        //     }    
        
        

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
                let product = products.find(prd=>prd.id===id);
                if(product){
                    try{
                        let prodObj = products.filter(prd => prd.id !== id);
                        products.splice(prodObj);
                        await fs.promises.writeFile('./Files/products.txt',
                        JSON.stringify([prodObj],null,2))
                            return {status:"success",message:`Producto "${id}" eliminado.`}
                        }catch(err){
                            return {status:"error",message:`"${id} no encontrado."`+error}
                        }
                    }else{
                    return {status:"error",message:`Producto con ID "${id} no encontrado.`}
                }
            }catch(err){
                return {status:"error",message:"No se encontro el producto."}
            }
        }

        async updateProd(id,body){
            try{
                let data = await fs.promises.readFile('./Files/products.txt','utf-8');
                let products = JSON.parse(data);
                if(!products.some(prod=>prod.id===id)) return {status:"error", message:"No hay ningún producto con el id especificado"}
                let result = products.map(prod=>{
                    if(prod.id===id){
                        if(prod.hProd){
                            body = Object.assign(body,{hProd:true,prod:id.prod})
                            body = Object.assign({id:prod.id,...body})
                            return body
                        }
                        else{
                            body = Object.assign(body,{hProd:false})
                            body = Object.assign({id:prod.id,...body})
                            return body;
                        }
                    }else{
                        return prod;
                    }
                })
                try{
                    await fs.promises.writeFile('./Files/productos.txt',JSON.stringify(result,null,2));
                    return {status:"success", message:"Producto actualizado"}
                }catch{
                    return {status:"error", message:"Error al actualizar el producto"}
                }
            }catch{
                return {status:"error",message:"Fallo al actualizar el producto"}
            }
        }
}

module.exports = Contenedor;


