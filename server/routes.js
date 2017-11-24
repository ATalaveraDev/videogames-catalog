var Videogame = require('./videogame');

module.exports = function (app) {
  app.route('/api/videogames')
    .get(function (req, res) {
      Videogame.find(function (err, res) {
        return res;
      }).then(function (result) {
        return res.send(result);
      });
    })
    .post(function (req, res) {
      var videogame = new Videogame();

      videogame.name = req.body.name;
      videogame.status = req.body.status;
      videogame.platform = req.body.platform;

      videogame.save().then(function (result) {
        return res.send(result);
      });
    });

  app.route('/api/videogames/:status')
    .get(function (req, res) {
      Videogame.find({status: req.params.status}, function (err, res) {
        return res;
      }).then(function (result) {
        return res.send(result);
      });
    })
};
