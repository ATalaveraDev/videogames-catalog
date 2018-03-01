'use strict';

var express = require('express');
var app = express();

require('./server/modules/database/connection')();
require('./server/modules/body-parser/body-parser')(app);
require('./server/modules/method-override/method-override')(app);

var port = process.env.PORT || 8080;
var igdb = require('./server/modules/igdb-api/igdb')();

app.use(express.static(__dirname + '/src/index.html'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

require('./server/routes')(app);

app.all('/*', function (req, res) {
  res.sendFile('src/index.html', { root: __dirname });
});

app.listen(port);

console.log('Games running at port: ' + port);

