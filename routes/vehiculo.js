const express = require('express');
const Vehiculo = require('../models/vehiculo')
const Marca = require('../models/marca')
const Modelo = require('../models/modelo')
const app = express();
app.get('/', function (req, res) {
    res.json('arriba')


})

app.get('/app/vehiculo/:id', function (req, res) {
    let id = req.params.id
    let vehiculo = Vehiculo.find({ placa: id }, (error, respuesta) => {
        res.json(respuesta)
    });

})

app.get('/app/vehiculo/marca/:id', function (req, res) {
    let id = req.params.id
    let marca = Marca.find({ codigo: id }, (errormarca, respuestamarca) => {
        if (respuestamarca.length === 0) {
            console.log('entro');
            return res.status(404).json();
        }
        let vehiculo = Vehiculo.find({ marca: respuestamarca[0]._id }, (error, respuesta) => {
            if (respuesta.length === 0) {
                console.log('entro');
                return res.status(404).json();
            }
            res.json(respuesta)
        });
    });

})

app.get('/app/vehiculo/modelo/:id', function (req, res) {
    let id = req.params.id
    let modelo = Modelo.find({ codigoMarca: id }, (errormodelo, respuestamodelo) => {
        if (respuestamodelo.length === 0) {
            console.log('entro');
            return res.status(404).json();
        }
        let vehiculo = Vehiculo.find({ modelo: respuestamodelo[0]._id }, (error, respuesta) => {
            if (respuesta.length === 0) {
                console.log('entro');
                return res.status(404).json();
            }
            res.json(respuesta)
        });
    });

})

app.get('/app/vehiculo/propietarios/:id', function (req, res) {
    let id = req.params.id
    let vehiculo = Vehiculo.find({}, (error, respuesta) => {
        if (respuesta.length == 0) {
            return res.status(404).json();
        }
        var resultado = [];
        for (var i = 0; i < respuesta.length; i++) {
            var hoy = new Date();
            var cumpleanos = new Date(respuesta[i].propietario.fechaNacimiento);
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }

            if (id < edad) {
                resultado.push(respuesta[i].propietario);

            }
        }
        if (resultado.length != 0) {

            res.json(resultado)
        } else {
            return res.status(404).json();
        }
    });

})


app.put('/app/Vehiculo/propietarios', function (req, res) {

    let body = req.body;
    console.log(body);
    let vehiculo = Vehiculo.updateOne({ placa: body.placa }, { $set: { propietario: body.propietario } }, (error, respuesta) => {
        if (respuesta.length === 0) {
            console.log('entro');
            return res.status(404).json();
        }
        res.json(respuesta);
    });


})
app.post('/app/Vehiculo', function (req, res) {
    let body = req.body;

    let marca = Marca.find({ codigo: body.marca }, (errormarca, respuestamarca) => {
        if (respuestamarca.length === 0) {
            console.log('entro');
            return res.status(404).json();
        }
        let modelo = Modelo.find({ codigoMarca: body.modelo }, (errormodelo, respuestamodelo) => {
            if (respuestamodelo.length === 0) {
                console.log('entro');
                return res.status(404).json();
            }
            if ((body.anho <= 2019) && (body.anho >= 1800)) {
                if ((body.motor < 10000) && (body.motor > 0)) {
                    if ((body.transmision == "MAN") || (body.transmision == "AUT")) {
                        let nuevo = new Vehiculo({
                            placa: body.placa,
                            marca: respuestamarca[0]._id,
                            modelo: respuestamodelo[0]._id,
                            anho: body.anho,
                            motor: body.motor,
                            transmision: body.transmision,
                            propietario: body.propietario
                        });
                        nuevo.save();
                        return res.json(nuevo);
                    } else {
                        return res.status(404).json();
                    }
                } else {
                    return res.status(404).json();
                }
            } else {
                return res.status(404).json();
            }


        });
    });






})

module.exports = app;