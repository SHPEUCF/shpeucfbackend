import { userConverter } from '../Models/User';
import { db } from '../index';
import { Member } from '../Models/Member';
/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return db.collection('users').withConverter(userConverter);
}

export const editMember = (member: Member) => {
	getUserCollection().doc(member.id).collection('member').doc(member.id).set({ ...member })
		.then(() => {
			getUserCollection().doc(member.id).collection('member').doc(member.id).update({ ...member })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => {
			getUserCollection().doc(member.id).update({ userMade: member.user, paidMember: member.paidMember })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};