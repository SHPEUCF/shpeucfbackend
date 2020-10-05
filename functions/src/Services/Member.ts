import { User, userConverter } from '../Models/User';
import { db } from '../index';
import { Member } from '../Models/Member';
/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return db.collection('users').withConverter(userConverter);
}

export const editMember = (user: User, member: Member) => {
	// const memberRef = db.collection('member').doc(member.id);
	// const userBool = true;

	getUserCollection().doc(user.id).collection('member').doc(member.id).set({ ...member })
		.then(() => {
			getUserCollection().doc(user.id).collection('member').doc(member.id).update({ ...member })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => {
			getUserCollection().doc(user.id).update({ userMade: member.user, paidMember: member.paidMember })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};