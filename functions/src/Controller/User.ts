import { User, userConverter } from '../Models/User';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { createUser, editUser } from '../Services/User';

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