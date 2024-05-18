// // routes/googleCalendar.js
// const express = require('express');
// const router = express.Router();
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   YOUR_CLIENT_ID,
//   YOUR_CLIENT_SECRET,
//   YOUR_REDIRECT_URL
// );

// router.post('/', async (req, res) => {
//   const { title, description, participants, date, time, duration, sessionNotes } = req.body;
//     console.log(req , "bipin")
//   // Ensure the user has authorized the app to access their Google Calendar
//   // ...

//   const event = {
//     summary: title,
//     description,
//     start: {
//       dateTime: new Date(`${date}T${time}`).toISOString(),
//       timeZone: 'America/Los_Angeles',
//     },
//     end: {
//       dateTime: new Date(`${date}T${time}`).setHours(new Date(`${date}T${time}`).getHours() + parseInt(duration)).toISOString(),
//       timeZone: 'America/Los_Angeles',
//     },
//     attendees: participants.split(',').map(email => ({ email: email.trim() })),
//     reminders: {
//       useDefault: false,
//       overrides: [
//         { method: 'email', minutes: 24 * 60 },
//         { method: 'popup', minutes: 10 },
//       ],
//     },
//   };

//   try {
//     const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
//     await calendar.events.insert({
//       auth: oauth2Client,
//       calendarId: 'primary',
//       resource: event,
//     });
//     res.status(200).send('Event created and synced with Google Calendar');
//   } catch (error) {
//     console.error('Error syncing event with Google Calendar', error);
//     res.status(500).send('Error syncing event with Google Calendar');
//   }
// });

// module.exports = router;
