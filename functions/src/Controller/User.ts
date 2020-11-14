import { User, userConverter } from '../Models/User';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { createUser, editUser } from '../Services/User';
import { Committee } from '../Models/Committee';
import { getCommitteeCollection } from './Committee';
import { assignPosition } from '../Services/User';
/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return db.collection('users').withConverter(userConverter);
}

export const createUserController = functions.https.onRequest(async (request, response) => {
	const user: User = new User(request.body);

	createUser(user)
		.then(() => response.status(200).send('Good Job'))
		.catch(error => response.status(400).send(error));
});

export const editUserController = functions.https.onRequest(async (request, response) => {
	const user: User = new User(request.body);
	const userCollection = getUserCollection();
	const userDoc = userCollection.doc(user.id);

	/**
	 * If the User document exists, complete the editUser function.
	 */
	await userDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			void editUser(user);
			response.status(200).send('Good Job');
		}
		else {
			response.status(404).send('Error 404: User document not found');
		}
	});
});

export const assignPositionController = functions.https.onRequest(async (request, response) => {
	const user: User = new User(request.body[0]);
	const committee: Committee = new Committee(request.body[1]);

	const userCollection = getUserCollection();
	const userDoc = userCollection.doc(user.id);

	const committeeCollection = getCommitteeCollection();
	const committeeDoc = committeeCollection.doc(committee.id);

	let validUser = false;
	let validCommittee = false;

	userDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validUser = true;
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	committeeDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validCommittee = true;
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));;

	let errorResponse = '';

	/**
	 * Creates our error messages.
	 */
	if (!validUser)
		errorResponse += 'Error 404: User document not found\n';
	if (!validCommittee)
		errorResponse += 'Error 404: Committee document not found\n';

	if (validUser && validCommittee) {
		assignPosition(user.id, committee.id);
		response.status(200).send('Good Job');
	}
	else {
		response.status(404).send(errorResponse);
	}
});