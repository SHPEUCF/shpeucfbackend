import firebase from 'firebase-admin';

/**
 * The eventsAttended subCollection (created by checkIn) inside of a user stores documentReferences to events that the user attended,
 * that way if any of the event data updates, we don't have to update the subCollection inside of a user
 */
export class User {
	voted: boolean = false;
	applied: boolean = false;
	userCommittees: string[] = [];
	userMade: boolean = false;
	privilege: object = {};
	color: string = '';
	points: number = 0;
	flag: string = '';
	picture: string = '';
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	major: string = '';
	country: string = '';
	gender: string = '';
	birthday: string = '';
	paidMember: boolean = false;
	id: string = '';

	constructor(user: Partial<User> = {}) {
		Object.assign(this, user);
	}
}

export const userConverter = {
	toFirestore: function(user: User): firebase.firestore.DocumentData {
		const { voted, applied, userCommittees, privilege, color, country, picture, points, flag,
			firstName, lastName, email, major, gender, birthday, id, userMade } = user;

		return { voted, applied, userCommittees, privilege, color, country, picture, points, flag,
			firstName, lastName, email, major, gender, birthday, id, userMade };
	},
	fromFirestore: function(snapshot: firebase.firestore.DocumentData): User {
		const data = snapshot;

		return new User(data);
	}
};