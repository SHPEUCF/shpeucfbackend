import { User, userConverter } from '../Models/User';
import { firestore } from 'firebase-admin';
import { Member } from '../Models/Member';
/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return firestore().collection('users').withConverter(userConverter);
}

// function getUpdateCollection() {
// 	return firestore().collection('member').withConverter(MemberConverter);
// }

export const editMember = (user: User, member: Member) => {
	const memberRef = firestore().collection('member').doc(member.id);
	const currUser: boolean = true;

	getUserCollection().doc(user.id).collection('member').doc(member.id).set({ member: memberRef })
		.then(() => {
			getUserCollection().doc(user.id).update({ userMade: currUser })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

// export const editUser = async (user: User) => {
// 	const userCollection = getUserCollection();
// 	const userDoc = userCollection.doc(user.id);

// 	/**
// 	 * Update all fields in User except prohibited fields such as voted, privilege, points, firstName, and lastName
// 	 */
// 	userDoc.update({ ...user })
// 		.then(() => Promise.resolve())
// 		.catch(error => Promise.reject(error));
// };