'use strict';

module.exports = function (app) {
  var bodyParser = require('body-parser');

  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(bodyParser.urlencoded({ extended: true }));
};
