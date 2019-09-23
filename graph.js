require('dotenv').config();
var moment = require("moment-timezone");
var graph = require('@microsoft/microsoft-graph-client');
const AADCALID = process.env.AADCALID;

module.exports = {
  getEvents: async function (accessToken) {
    var starttime = moment.utc().format();
    var endtime = moment.utc().add(12, 'hours').format();
    //console.log(starttime)
    //console.log(endtime)
    const client = getAuthenticatedClient(accessToken);
    const events = await client
      .api('/users/' + AADCALID + '/calendar/calendarView?startDateTime=' + starttime + '&endDateTime=' + endtime)
      .select('subject','location','organizer','start','end')
      .orderby('start/dateTime,end/dateTime')
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