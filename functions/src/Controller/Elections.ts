import { electionsConverter } from '../Models/Elections';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { openElections, deletePosition } from '../Services/Elections';
import { Position } from '../Models/Position';

export function getElectionsCollection() {
	return db.collection('elections').withConverter(electionsConverter);
}

export const openElectionsController = functions.https.onRequest((request, response) => {
	openElections();
	response.status(200).send('Good Job');
});

export const deletePositionController = functions.https.onRequest((request, response) => {
	const position : Position = new Position(request.body);

	deletePosition(position);

	response.status(200).send('Good Job');
});