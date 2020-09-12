import { User, userConverter } from '../Models/User';
import { db } from '../index';
import { firestore } from 'firebase-admin';

/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return firestore().collection('users').withConverter(userConverter);
}

export const createUser = async (user: User) => {
	const userCollection = db.collection('users').withConverter(userConverter);

	getUserCollection().doc(user.id).set({ userRef: userReference })
		.then(() => Promise.resolve())
		.catch((error: any) => Promise.reject(error));
	// getUserCollection().doc(user.id).collection('user').doc(user.id).set({ userRef: userReference })
};