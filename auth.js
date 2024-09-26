require('dotenv').config();
const msal = require('@azure/msal-node');

const TENANT_ID = process.env.TENANT_ID;
const AAD_ENDPOINT = process.env.AAD_ENDPOINT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const GRAPH_ENDPOINT = process.env.GRAPH_ENDPOINT;
const AADCALID = process.env.AADCALID;

const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: AAD_ENDPOINT + '/' + TENANT_ID,
    clientSecret: CLIENT_SECRET,
  }
};

const tokenRequest = {
  scopes: [GRAPH_ENDPOINT + '/.default'],
};

const apiConfig = {
  uri: GRAPH_ENDPOINT + '/v1.0/users/' + AADCALID + '/calendar/calendarView'
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getToken(tokenRequest) {
  return await cca.acquireTokenByClientCredential(tokenRequest);
}

module.exports = {
  apiConfig: apiConfig,
  tokenRequest: tokenRequest,
  getToken: getToken
};