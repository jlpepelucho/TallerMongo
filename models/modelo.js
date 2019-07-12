const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modeloSchema = new Schema({
    codigoMarca: {
        type: String
    },
    nombre: {
        type: String,
    }
})
module.exports = mongoose.model('Modelo', modeloSchema);