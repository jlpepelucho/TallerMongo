const express = require('express');
const Vehiculo = require('../models/vehiculo')
const Marca = require('../models/marca')
const Modelo = require('../models/modelo')
const app = express();
app.get('/', function(req, res) {
    res.json('arriba')


})

app.get('/app/vehiculo/:id', function(req, res) {
    let id = req.params.id
    let vehiculo = Vehiculo.find({ placa: id }, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.get('/app/vehiculo/marca/:id', function(req, res) {
    let id = req.params.id
    let vehiculo = Vehiculo.find({ marca: id }, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.get('/app/vehiculo/modelo/:id', function(req, res) {
    let id = req.params.id
    let vehiculo = Vehiculo.find({ modelo: id }, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.get('/app/vehiculo/propietarios/:id', function(req, res) {
    let id = req.params.id
    let vehiculo = Vehiculo.find({ codigo: id }, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.put('/app/Vehiculo/propietarios', function(req, res) {
    let body = req.body;
    let nuevo = new vehiculo({
        codigo: body.codigo,
        nombre: body.nombre
    });
    nuevo.save();
    return res.json(nuevo);
})
app.put('/app/Vehiculo/propietarios', function(req, res) {
   
    let body = req.body;
    console.log(body);
    let vehiculo = Vehiculo.find({ placa: body.placa }, (error, respuesta) => {
        respuesta.propietario=body.propietario
        Vehiculo.findOneAndUpdate(
            {placa:body.placa}, respuesta, (error, res1) => {
            if (error)
                return res.status(404);
            res.json(res1);
        })
    });
    

})
app.post('/app/Vehiculo', function(req, res) {
    let body = req.body;
    
    let marca = Marca.find({ codigo: body.marca }, (error, respuesta) => {
        let modelo = Modelo.find({ codigoMarca: body.modelo }, (error, respuesta) => {
            if ((body.anho < 2020)&&(body.anho > 1979)) {
                if ((body.motor < 10000)&&(body.motor > 0)) {
                    if((body.transmision=="MAN")||(body.transmision=="AUT")){
                    let nuevo = new vehiculo({
                        placa: body.placa,
                        marca: body.marca,
                        modelo: body.modelo,
                        anho: body.anho,
                        motor:body.motor,
                        transmision: body.transmision,
                        propietario: body.propietario
                    });
                    nuevo.save();
                }
                }
            }
              
            
        });
    });

    

    
    
    return res.json(nuevo);
})

module.exports = app;