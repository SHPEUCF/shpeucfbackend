import firebase from 'firebase-admin';
import * as userController from './Controller/User';
import * as eventController from './Controller/Event';
import * as memberController from './Controller/Member';
import * as committeeController from './Controller/Committee';
import * as electionsController from './Controller/Elections';
import * as positionController from './Controller/Position';

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

export const createUser = userController.createUserController;
export const editUser = userController.editUserController;
export const assignPosition = userController.assignPositionController;
export const createEvent = eventController.createEventController;
export const editEvent = eventController.editEventController;
export const deleteEvent = eventController.deleteEventController;
export const checkIn = eventController.checkInController;
export const rsvp = eventController.rsvpController;
export const getEvent = eventController.getEventController;
export const editMember = memberController.editMembersController;
export const addCommittee = committeeController.addCommitteeController;
export const getCommittee = committeeController.getCommitteesController;
export const editCommittee = committeeController.editCommitteeController;
export const deleteCommittee = committeeController.deleteCommitteeController;
export const closeElections = electionsController.closeElectionsController;
export const changeDisplayOrder = committeeController.changeDisplayOrderController;
export const openElections = electionsController.openElectionsController;
export const addApplication = electionsController.addApplicationController;
export const addPosition = positionController.addPositionController;
export const approveApplication = electionsController.approveApplicationController;