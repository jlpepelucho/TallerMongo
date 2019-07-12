const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(require('./routes/marca'))

app.use(require('./routes/modelo'))

mongoose.connect('mongodb://localhost:27017/taller', { useNewUrlParser: true }, (error) => {
    if (error) {
        throw new Error;
    }
    console.log("base conectada");
});

app.listen(3000, () => {
    console.log("servidor levantado");
});