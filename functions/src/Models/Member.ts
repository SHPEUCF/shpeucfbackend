import firebase from 'firebase-admin';

/**
 * Members will be a subclass of user in charge of change and updating privilges
 */
export class Member {
	privilege: object = {};
	firstName: string = '';
	lastName: string = '';
	paidMember: boolean = false;
	id: string = '';
	user: boolean = false;
	board: boolean = false;
	eboard: boolean = false;
	president: boolean = false;

	constructor(member: Partial<Member> = {}) {
		Object.assign(this, member);
	}
}

export const MemberConverter = {
	toFirestore: function(member: Member): firebase.firestore.DocumentData {
		const { paidMember, firstName, lastName, id, user,
			board, eboard, president } = member;

		return { paidMember, firstName, lastName, id, user,
			board, eboard, president };
	},
	fromFirestore: function(snapshot: firebase.firestore.DocumentData): Member {
		const data = snapshot;

		return new Member(data);
	}
};