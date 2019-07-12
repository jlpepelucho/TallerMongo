const express = require('express');
const Modelo = require('../models/modelo')
const app = express();
app.get('/', function(req, res) {
    res.json('arriba')


})

app.get('/app/modelo/:id', function(req, res) {
    let id = req.params.id
    let marca = Modelo.find({ codigoMarca: id }, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.get('/app/modelo', function(req, res) {
    let id = req.params.id
    let marca = Modelo.find({}, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.post('/app/modelo', function(req, res) {
    let body = req.body;
    let nuevo = new Modelo({
        codigoMarca: body.codigoMarca,
        nombre: body.nombre
    });
    nuevo.save();
    return res.json(nuevo);
})

module.exports = app;