import { User, userConverter } from '../Models/User';
import { firestore } from 'firebase-admin';

/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return firestore().collection('users').withConverter(userConverter);
}

export const createUser = async (user: User) => {
	const userCollection = getUserCollection().withConverter(userConverter);

	userCollection.add(user)
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const editUser = async (user: User) => {
	const userCollection = getUserCollection().withConverter(userConverter);
	const userDoc = userCollection.doc(user.id);

	/**
	 * Update all fields in User except prohibited fields such as voted, privilege, points, firstName, and lastName
	 */
	userDoc.update({
		applied: user.applied,
		userCommittees: user.userCommittees,
		color: user.color,
		flag: user.flag,
		picture: user.picture,
		email: user.email,
		major: user.major,
		country: user.country,
		gender: user.gender,
		birthday: user.birthday })
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};