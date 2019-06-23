require('dotenv').config();
const addSubtractDate = require("add-subtract-date");
var graph = require('@microsoft/microsoft-graph-client');
const AADCALID = process.env.AADCALID;

module.exports = {
  getEvents: async function(accessToken) {
    var starttime = new Date(new Date())
    var endtime = new Date(addSubtractDate.add(new Date(), 7, "days"))
    console.log(starttime.toUTCString())
    console.log(endtime.toUTCString())
    const client = getAuthenticatedClient(accessToken);
    const events = await client
      .api('/users/'+AADCALID+'/events')
      .select('subject','location','organizer','start','end')
      .filter("start/dateTime ge '"+starttime.toUTCString()+"'","end/dateTime le '"+endtime.toUTCString()+"'",'')
      .orderby('start/dateTime')
      .get();
    return events;
  }
};

function getAuthenticatedClient(accessToken) {
    // Initialize Graph client
    const client = graph.Client.init({
      // Use the provided access token to authenticate
      // requests
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
    return client;
  }