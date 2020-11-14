import { electionsConverter } from '../Models/Elections';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { Position } from '../Models/Position';
import { openElections, deletePosition } from '../Services/Elections';
import { closeElections } from '../Services/Elections';

export function getElectionsCollection() {
	return db.collection('elections').withConverter(electionsConverter);
}

export const closeElectionsController = functions.https.onRequest((request, response) => {
	closeElections();
	response.status(200).send('Good Job');
});

export const openElectionsController = functions.https.onRequest((request, response) => {
	openElections();
	response.status(200).send('Good Job');
});

export const deletePositionController = functions.https.onRequest((request, response) => {
	const position : Position = new Position(request.body);

	deletePosition(position);

	response.status(200).send('Good Job');
});