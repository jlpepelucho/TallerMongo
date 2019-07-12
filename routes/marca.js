const express = require('express');
const Marca = require('../models/marca')
const app = express();
app.get('/', function(req, res) {
    res.json('arriba')


})

app.get('/app/marca/:id', function(req, res) {
    let id = req.params.id
    let marca = Marca.find({ codigo: id }, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.get('/app/marca', function(req, res) {
    let id = req.params.id
    let marca = Marca.find({}, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.post('/app/marca', function(req, res) {
    let body = req.body;
    let nuevo = new Marca({
        codigo: body.codigo,
        nombre: body.nombre
    });
    nuevo.save();
    return res.json(nuevo);
})

module.exports = app;