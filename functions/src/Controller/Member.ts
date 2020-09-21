import { User, userConverter } from '../Models/User';
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';

function getUserCollection() {
	return firestore().collection('users').withConverter(userConverter);
}

export const editMemberController = functions.https.onRequest((request, response) => {
	const event: Event = new Event(request.body);

	//createEvent(event);
	response.status(200).send('Good Job');
});