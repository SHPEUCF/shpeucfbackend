import firebase from 'firebase-admin';

export class Elections {
	votingOpen: boolean = false;
	applicationsOpen: boolean = false;
	positions: Position[] = [];
    
    constructor(elections: Partial<Elections> = {}) {
		Object.assign(this, elections);
	}
}

export const electionsConverter = {
	toFirestore: function(elections: Elections): firebase.firestore.DocumentData {
		const { votingOpen, applicationsOpen, positions } = elections;

		return { votingOpen, applicationsOpen, positions };
	},
	fromFirestore: function(snapshot: firebase.firestore.DocumentData): Elections {
		const data = snapshot;

		return new Elections(data);
	}
};