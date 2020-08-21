import * as functions from 'firebase-functions';
// import * as opt from '@google-cloud/firestore';
// const firebase = require('firebase');
import firebase from 'firebase-admin';
import 'firebase/firestore';

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
export const db = firebase.firestore(app);



import * as userService from './Controller/User';
import * as eventService from './Controller/Events';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const makeUppercase = functions.firestore.document('/messages/{documentId}')
  .onCreate((snap, context) => {
    const original = snap.data().original;
    console.log('Uppercasing', context.params.documentId, original);
    const uppercase = original.toUpperCase();
    return snap.ref.set({uppercase}, {merge: true});
  });

export const helloWorld = functions.https.onRequest(async (request, response) => {
  const docRef = db.collection('users').doc('alovelace');
  docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
  
});


  

export const createUser = userService.create_User;
export const createEvent = eventService.create_Event;
export const editEvent = eventService.edit_Event;
export const deleteEvent = eventService.delete_Event;
export const checkIn = eventService.check_In;
export const rsvp = eventService.rsvps;
