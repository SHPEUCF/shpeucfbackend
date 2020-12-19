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

	/**
	 * If the User document exists, complete the editMember function.
	 */
	editPosition(pos)
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	response.status(200).send('Good Job');
});