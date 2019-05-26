const express = require('express');
const path = require('path');

const PORT = process.env.PORT;

let app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.redirect('/control');
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT || 3000);
