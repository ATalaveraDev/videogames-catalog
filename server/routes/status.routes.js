'use strict';

module.exports = function (app, model) {
  app.route('/api/videogames/:status')
    .get(function (request, response) {
      model.find({ status: request.params.status }, function (err, response) {
        return response;
      }).then(function (result) {
        return response.send(result);
      });
    });

  app.route('/api/videogames/:id/status')
    .put(function (request, response) {
      model.findByIdAndUpdate({ _id: request.params.id }, { $set: { status: request.body.status } }, { new: true }, function (err, result) {
        return response.send(result);
      });
    });
};
