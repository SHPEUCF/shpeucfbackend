import { User, userConverter } from '../Models/User';
import { firestore } from 'firebase-admin';
import { Member, MemberConverter } from '../Models/Member';

/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return firestore().collection('users').withConverter(userConverter);
}

function getMemberCollection() {
	return firestore().collection('member').withConverter(MemberConverter);
}

export const editMember = (user: User, member: Member) => {
	const memberRef = getMemberCollection().doc(member.id);
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

export const assignPosition = (user : User, member : Member) => {
	const userCollection = getUserCollection();
	const userDoc = userCollection.doc(user.id);

	const memberDoc = userDoc.collection('member').withConverter(MemberConverter).doc(member.id);

	memberDoc.update({ ...member })
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};