import firebase from 'firebase-admin';
import * as userService from './Controller/User';
import * as eventService from './Controller/Event';

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

const app = firebase.initializeApp(config);

const db = firebase.firestore(app);
db.settings({
  ssl: false,
  timestampsInSnapshots: true
});

export { db };
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const createUser = userService.create_User;
export const createEvent = eventService.create_Event;
export const editEvent = eventService.edit_Event;
export const deleteEvent = eventService.delete_Event;
export const checkIn = eventService.check_In;
export const rsvp = eventService.rsvps;
export const getEvent = eventService.get_Event;