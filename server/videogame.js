var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideogameSchema = new Schema({
  name: String,
  status: String,
  platform: String
});

module.exports = mongoose.model('Videogame', VideogameSchema);
