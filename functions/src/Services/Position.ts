// import * as functions from 'firebase-functions';
import { electionsConverter } from '../Models/Elections';
import { db } from '../index';
import { Position, positionConverter } from '../Models/Position';

export function getElectionsCollection() {
	return db.collection('elections').withConverter(electionsConverter);
}

export function getPositionCollection() {
	return db.collection('position').withConverter(positionConverter);
}

export const editPosition = async (pos: Position) => {
	let isOpen: boolean = false;

	getElectionsCollection().get().then(QuerySnapshot => {
		(QuerySnapshot.docs[0]).ref.get().then(documentSnapshot => {
			isOpen = documentSnapshot.get('applicationsOpen');
			// we only want to update if applications are open
			if (isOpen) {
				getPositionCollection().doc(pos.id).update({ title: pos.title,
					description: pos.description, level: pos.level })
					.then(() => Promise.resolve())
					.catch(error => Promise.reject(error));
			}
		})
			.then(() => Promise.resolve())
		    .catch(error => Promise.reject(error));
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};