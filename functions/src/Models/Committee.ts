import firebase from 'firebase-admin';

export class Committee {
	id: string = '';
	title: string = '';
	events: string[] = [];
	chair: string[] = [];
	description: string = '';
	displayOrder: number = 0;

	constructor(committee: Partial<Committee> = {}) {
		Object.assign(this, committee);
	}
}

/**
 * Converts Committee objects into object literals and vice versa.
 *
 * We need this because the Firestore can't handle custom objects (Ex: The Committee object in this file), the data to be passed needs to be an object literal
 */
export const committeeConverter = {
	toFirestore: function(committee: Committee): firebase.firestore.DocumentData {
		const { id, title, events, chair, description } = committee;

		return { id, title, events, chair, description };
	},
	fromFirestore: function(snapshot: firebase.firestore.DocumentData): Committee {
		const data = snapshot;

		return new Committee(data);
	}
};