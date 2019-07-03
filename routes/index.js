var express = require('express');
var auth = require('../auth');
var graph = require('../graph.js');

var router = express.Router();

/* GET home page. */
router.get('/', 
  async function(req, res) {
    let params = {};
    try {
      var authToken = await auth.getAccessToken();
    } catch (err) {
      console.log('failed to aquire access token');
    }
    try {
      var hiddenregex = /internt møte/ig;
      var events = await graph.getEvents(authToken);
      params.events = events.value.filter(function(string){
        return !hiddenregex.test(string.location.displayName);
      });
    } catch (err) {
      console.log(err)
    }
    res.render('index', params );
  });

module.exports = router;
