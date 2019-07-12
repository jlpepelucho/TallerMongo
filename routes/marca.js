const express = require('express');
const Marca = require('../models/marca')
const app = express();

app.get('/app/marca/:id', function(req, res) {
    let id = req.params.id
    let marca = Marca.findById(id, (error, producto) => {
        res.json(marca)
    });

})

app.get('/app/marca', function(req, res) {
    let id = req.params.id
    let marca = Marca.find({}, (error, producto) => {
        res.json(marca)
    });

})

app.post('/app/marca', function(req, res) {
    let body = req.body;
    let nuevo = new Producto({
        codigo: body.codigo,
        nombre: body.nombre
    });
    nuevo.save();
    return res.json(nuevo);
})

module.exports = app;