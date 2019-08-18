'use strict';

module.exports = function (app, igdb) {
  app.route('/api/games/search')
    .post(function (request, response) {
      return igdb().fields([ 'name', 'release_dates.date', 'rating', 'cover' ]).search(request.body.title).request('/games').then(function (res) {
        return response.send(res.data)
      });
    });
};
