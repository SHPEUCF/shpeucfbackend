import { User, userConverter } from '../Models/User';
import { firestore } from 'firebase-admin';
import { db } from '../index';
import { committeeConverter } from '../Models/Committee';

/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return db.collection('users').withConverter(userConverter);
}

function getCommitteeCollection() {
	return db.collection('committees').withConverter(committeeConverter);
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

export const assignPosition = (userID: string, committeeID: string) => {
	const userCollection = getUserCollection();
	const userDoc = userCollection.doc(userID);

	const committeeCollection = getCommitteeCollection();
	const committeeDoc = committeeCollection.doc(committeeID);
	const newChair = firestore.FieldValue.arrayUnion(userDoc.id);

	committeeDoc.update({ chair: newChair }).then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};