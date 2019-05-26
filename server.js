const express = require('express');
const path = require('path');

let app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get(['/', '/*'], (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
