require('dotenv').config();
require('isomorphic-fetch');

var request = require('request');

const TOKEN_ENDPOINT = process.env.TOKEN_ENDPOINT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// The auth module object.
var auth = {};

auth.getAccessToken = function () {
  return new Promise(function (resolve, reject){
    var requestParams = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials'
    };
    request.post({ url: TOKEN_ENDPOINT, form: requestParams }, function (err, response, body) {
      var parsedBody = JSON.parse(body);
      if (err) {
        reject(err);
      } else if (parsedBody.error) { 
        reject(parsedBody.error);
      } else {
        resolve(parsedBody.access_token);
      }
    });
  });
}
module.exports = auth;