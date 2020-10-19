import { User, userConverter } from '../Models/User';
import { firestore } from 'firebase-admin';

/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return firestore().collection('users').withConverter(userConverter);
}

export const createUser = async (user: User) => {
	const userCollection = getUserCollection();

	userCollection.doc(user.id).set(user)
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const editUser = async (user: User) => {
	const userCollection = getUserCollection();
	const userDoc = userCollection.doc(user.id);

	/**
	 * Update all fields in User except prohibited fields such as voted, privilege, points, firstName, and lastName
	 */
	userDoc.update({ ...user })
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};