import { electionsConverter } from '../Models/Elections';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { Position, positionConverter } from '../Models/Position';
import { editPosition } from '../Services/Position';

export function getElectionsCollection() {
	return db.collection('elections').withConverter(electionsConverter);
}

export function getPositionCollection() {
	return db.collection('position').withConverter(positionConverter);
}

export const editPositionController = functions.https.onRequest(async (request, response) => {
	const pos: Position = new Position(request.body);
	const posCollection = getPositionCollection();
	const posDoc = posCollection.doc(pos.id);

	/**
	 * If the User document exists, complete the editMember function.
	 */
	await posDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			editPosition(pos);
			response.status(200).send('Good Job');
		}
		else {
			response.status(404).send('Error 404: User document not found');
		}
	});
});