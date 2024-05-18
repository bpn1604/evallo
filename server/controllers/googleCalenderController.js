// controllers/googleCalendarController.js
const { google } = require('googleapis');
const oAuth2Client = require('../config/googleAuth');

// Redirect user to Google for authentication
exports.getAuthURL = (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
  res.send({ authUrl });
};

// Handle OAuth 2.0 callback
exports.handleGoogleCallback = async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  res.send(tokens);
};

// Sync events to Google Calendar
exports.syncEventsToGoogle = async (event) => {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });
  return response.data;
};
