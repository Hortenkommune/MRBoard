require('dotenv').config();
const moment = require("moment-timezone");

const auth = require('./auth');

async function getCalendarData() {
    const starttime = moment.utc().format();
    const endtime = moment.utc().add(12, 'hours').format();

    const endpoint = auth.apiConfig.uri + '?startDateTime=' + starttime + '&endDateTime=' + endtime + '&$select=subject,location,organizer,start,end&$orderby=start/dateTime,end/dateTime';
    const authResponse = await auth.getToken(auth.tokenRequest);
    const authToken = authResponse.accessToken;

    const options = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };

    try {
        const response = await fetch(endpoint, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.value;  
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = {
    getCalendarData: getCalendarData
};