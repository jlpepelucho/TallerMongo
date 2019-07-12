const mongoose = require('mongoose');
const Marca = require('./marca')
const Modelo = require('./modelo')
let Schema = mongoose.Schema;

let vehiculoSchema = new Schema({
    placa: {
        type: String
    },
    marca:  [{ type: Schema.Types.ObjectId, ref: 'Marca' }]
    ,
    modelo: [{ type: Schema.Types.ObjectId, ref: 'Modelo' }],
    anho: {
        type: Number
    },
    motor: {
        type: Number
    },
    transmision: {
        type: String
    },
    propietario: {
        cedula: {
            type: String
        },
        nombre: {
            type: String,
        },
        fechaNacimiento: {
            type: String,
        }
    }
})
module.exports = mongoose.model('Vehiculo', vehiculoSchema);