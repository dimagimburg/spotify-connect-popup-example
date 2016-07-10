var express = require('express');
var app = express();
app.use('/', express.static(__dirname)); // ← adjust
app.listen(3001, function() { console.log('listening'); });