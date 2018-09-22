"use strict"
// Load modules
require('dotenv').config()
var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('If you see this then server works');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
