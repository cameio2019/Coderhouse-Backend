const express = require('express');
const Contenedor = require('./classes/Class');
const app = express();
const PORT = process.env.PORT||8080;
const contenedor = new Contenedor();
const cors = require('cors');
const productosRouter = require('./routes/productos') 
const uploadServ = require('./services/uploadServ');

const server = app.listen(PORT,()=>{
    console.log("Servidor en escuha por:"+PORT)
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())


// Routers
app.use('/api/productos', productosRouter);
app.use(express.static('public'));

app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    next();
})

app.post('/api/uploadfile',uploadServ.fields([
    {
        name:'file', maxCount:1
    },
    {
        name:"documents", maxCount:3
    }
]),(req,res)=>{
    const files = req.files;
    console.log(files);
    if(!files||files.length===0){
        res.status(500).send({messsage:"No se subió archivo"})
    }
    res.send(files);
})
