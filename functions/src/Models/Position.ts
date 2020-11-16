import firebase from 'firebase-admin';

export class ElectionPosition {
	title: string = '';
	level: number = 0;
	description: string = '';

	constructor(position: Partial<ElectionPosition> = {}) {
		Object.assign(this, position);
	}
}

export const positionConverter = {
	toFirestore: function (position: ElectionPosition): firebase.firestore.DocumentData {
		const { title, level, description } = position;

		return { title, level, description };
	},

	fromFirestore: function (snapshot: firebase.firestore.DocumentData): ElectionPosition {
		const data = snapshot;

		return new ElectionPosition(data);
	}
};