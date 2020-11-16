import firebase from 'firebase-admin';

export class Election {
	votingOpen: boolean = false;
	applicationsOpen: boolean = false;

	constructor(elections: Partial<Election> = {}) {
		Object.assign(this, elections);
	}
}

export const electionConverter = {
	toFirestore: function(elections: Election): firebase.firestore.DocumentData {
		const { votingOpen, applicationsOpen } = elections;

		return { votingOpen, applicationsOpen };
	},
	fromFirestore: function(snapshot: firebase.firestore.DocumentData): Election {
		const data = snapshot;

		return new Election(data);
	}
};