const express = require('express');
const Contenedor = require('../classes/Class');
const router = express.Router();
const contenedor = new Contenedor();
const upload = require('../services/uploadServ')
const server = require('../server')


//GET
router.get('/', (req, res) => {
    contenedor.getAll().then(result => {
        if (result.status === 'success') res.status(200).json(result)
        else res.status(500).send(result)
    })
})

router.get('/:id', (req, res) => {
    let id= parseInt(req.params.id);
    contenedor.getById(id).then(result=>{
        res.send(result);
    })
})

//POSTS
router.post('/', (req, res) => {
    const product = {
        name:req.body.name,
        ProductId:req.body.ProductId,
        price:req.body.price,
        image:req.body.image,
    }
    contenedor.crearProducto(product).then(result => {
        if (result.status === 'success') res.status(200).json(result)
        else res.status(500).send(result)
    })
})

//POSTS
router.post('/',upload.single('image'),(req,res)=>{
    let file = req.file;
    let product = req.body;
    console.log(server);
    product.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images'+file.filename;
    contenedor.crearProducto(product).then(result=>{
        res.send(result);
    })
})

//PUTS
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let body = req.body;
    const product = req.body
    contenedor.updateProd(id, body).then(result => {
        if (result.status === 'success') res.status(200).json(result)
        else res.status(500).send(result)
    })
})

//DELETES
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    contenedor.deleteById(id).then(result => {
        if (result.status === 'success') res.status(200).json(result)
        else res.status(500).send(result)
    })
})

module.exports = router;