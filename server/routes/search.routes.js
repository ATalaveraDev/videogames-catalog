'use strict';

module.exports = function (app, igdb) {
  app.route('/api/games/search')
    .post(async function (request, response, next) {
      return igdb().fields([ 'name', 'release_dates.date', 'rating' ]).search(request.body.title).request('/games').then(function (res) {
        return response.send(res.data);
      });
    });
};
