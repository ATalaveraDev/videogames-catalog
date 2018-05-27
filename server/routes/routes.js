'use strict';

var Videogame = require('../videogame');

module.exports = function (app, igdb) {
  require('./main.routes')(app, Videogame);
  require('./status.routes')(app, Videogame);
  require('./search.routes')(app, igdb);
};
