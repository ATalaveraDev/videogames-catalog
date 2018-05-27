'use strict';

var mongoose = require('mongoose');

module.exports = function () {
  var dbKey = getDbKey();

  connectToDB(dbKey);
};

function getDbKey() {
  try {
    return require('./DB_KEY.js');
  } catch (exception) {
    throw new Error('No Database Connection was provided. Please provide a valid one');
  }
}

function connectToDB(key) {
  try {
    mongoose.connect(key, { useMongoClient: true });
  } catch (exception) {
    throw new Error('Could not connect to Videogames Database');
  }
}
