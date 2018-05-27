'use strict';

module.exports = function (app, igdb) {
  app.route('/api/games/search')
    .post(function (request, response) {
      igdb.games({ search: request.body.title }, [ 'name', 'release_dates.date', 'rating', 'cover' ]).then(function (result) {
        response.send(result.body);
      });
    });
};
