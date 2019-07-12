const express = require('express');
const Modelo = require('../models/modelo')
const Marca = require('../models/marca')
const app = express();
app.get('/', function(req, res) {
    res.json('arriba')


})

app.get('/app/modelo/:id', function(req, res) {
    let id = req.params.id
    let modelo = Modelo.find({ codigoMarca: id }, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.get('/app/modelo', function(req, res) {
    let id = req.params.id
    let modelo = Modelo.find({}, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.post('/app/modelo', function(req, res) {
    let body = req.body;

    let marca = Marca.find({ codigo: body.codigoMarca }, (error, respuesta) => {
        if (respuesta.length === 0) {
            console.log('entro');
            return res.status(404).json();
        } else {
            let nuevo = new Modelo({
                codigoMarca: body.codigoMarca,
                nombre: body.nombre
            });
            nuevo.save();
            return res.json(nuevo);
        }

    })

})

module.exports = app;