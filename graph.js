require('dotenv').config();
var moment = require("moment-timezone");
var graph = require('@microsoft/microsoft-graph-client');
const AADCALID = process.env.AADCALID;

module.exports = {
  getEvents: async function (accessToken) {
    var starttime = moment.utc().format();
    var endtime = moment.utc().add(12, 'hours').format();
    const client = getAuthenticatedClient(accessToken);
    const events = await client
      .api('/users/'+AADCALID+'/events')
      .select('subject','location','organizer','start','end')
      .filter("end/dateTime ge '"+ starttime +"' and end/dateTime le '"+ endtime +"'")
      .orderby('start/dateTime')
      .get();
    console.log(events.value)
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