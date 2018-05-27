'use strict';

module.exports = function (app, model) {
  app.route('/api/videogames')
    .get(function (req, res) {
      model.find(function (err, res) {
        return res;
      }).then(function (result) {
        return res.send(result);
      });
    })
    .post(function (req, res) {
      var videogame = new model();

      videogame.name = req.body.name;
      videogame.status = req.body.status;
      videogame.platform = req.body.platform;

      videogame.save().then(function (result) {
        return res.send(result);
      });
    });
};
