import { User, userConverter } from '../Models/User';
import { db } from '../index';
import { Member, memberConverter } from '../Models/Member';

/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return db.collection('users').withConverter(userConverter);
}

function getMemberCollection() {
	return db.collection('member').withConverter(memberConverter);
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