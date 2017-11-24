'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;

mongoose.connect('supermario:supermario@ds119685.mlab.com:19685/videogames');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/src/index.html'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

require('./server/routes')(app);

app.all('/*', function (req, res) {
  res.sendFile('src/index.html', { root: __dirname });
});

app.listen(port);

console.log('Games running at port: ' + port);

