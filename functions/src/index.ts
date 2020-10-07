import firebase from 'firebase-admin';
import * as userService from './Controller/User';
import * as eventService from './Controller/Event';
import * as committeeService from './Controller/Committee';

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

export const createUser = userService.createUserController;
export const editUser = userService.editUserController;
export const createEvent = eventService.createEventController;
export const editEvent = eventService.editEventController;
export const deleteEvent = eventService.deleteEventController;
export const checkIn = eventService.checkInController;
export const rsvp = eventService.rsvpController;
export const getEvent = eventService.getEventController;
export const addCommittee = committeeService.addCommitteeController;
export const getCommittee = committeeService.getCommitteesController;
export const editCommittee = committeeService.editCommitteeController;