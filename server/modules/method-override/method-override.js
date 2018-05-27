'use strict';

module.exports = function (app) {
  var methodOverride = require('method-override');

  app.use(methodOverride('X-HTTP-Method-Override'));
};
