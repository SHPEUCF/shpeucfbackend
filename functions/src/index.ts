import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin'
// admin.initializeApp(functions.firebaseConfig());

import * as userService from './Controller/User';
import * as eventService from './Controller/Events';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const createUser = userService.create_User;
export const createEvent = eventService.create_Event;
export const editEvent = eventService.edit_Event;
export const deleteEvent = eventService.delete_Event;
export const checkIn = eventService.check_In;
export const rsvp = eventService.rsvps;
