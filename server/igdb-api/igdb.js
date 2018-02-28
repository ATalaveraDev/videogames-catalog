module.exports = function() {
  var apiKey = getApiKey();

  return apiKey ? require('igdb-api-node').default(apiKey) : new Error('No ApiKey was provided. Please provide a valid one');
};

function getApiKey() {
  try {
    return require('./API_KEY.js');
  } catch (exception) {
    return null;
  }
}
