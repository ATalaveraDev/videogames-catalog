'use strict';

module.exports = function() {
  return require('igdb-api-node').default(getApiKey());
};

function getApiKey() {
  try {
    return require('./API_KEY.js');
  } catch (exception) {
    throw new Error('No ApiKey was provided. Please provide a valid one');
  }
}
