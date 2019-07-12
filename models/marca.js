const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let marcaSchema = new Schema({
    codigo: {
        type: String
    },
    nombre: {
        type: String,
    }
})
module.exports = mongoose.model('Marca', marcaSchema);