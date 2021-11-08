const express = require('express');
const Class = require('./classes/Class');
const app = express();
const PORT = process.env.PORT||8080;
const Class = new Class();

const server = app.listen(PORT,()=>{
    console.log("Servidor en escuha por:"+PORT)
})

// app.get('/',(req,res)=>{
//     res.send('Mi primer Server');
// })

// app.get('/productos',(req,res)=>{
//     console.log('req.query');
//     const status = req.query.status;
//     Class.getAll().then(result=>{
//         if(result.status==="succes"){
            
//         }
//     })
// })