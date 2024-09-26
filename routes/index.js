const express = require('express');
const router = express.Router();
const fetch = require('../fetch');

/* GET home page. */
router.get('/', 
  async function(req, res) {
    let params = {};
    try {
      const hiddenregex = /internt møte/ig;
      const events = await fetch.getCalendarData();
      params.events = events.filter(function(string){
        return !hiddenregex.test(string.location.displayName);
      });
    } catch (err) {
      console.log(err)
    }
    res.render('index', params );
  });

module.exports = router;
