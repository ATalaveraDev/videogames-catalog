var Videogame = require('../videogame');

module.exports = function (app, igdb) {
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

  require('./status.routes')(app, Videogame);
  require('./search.routes')(app, igdb);
};
