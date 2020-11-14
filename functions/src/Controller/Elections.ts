import { electionsConverter } from '../Models/Elections';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { closeElections } from '../Services/Elections';
import { openElections } from '../Services/Elections';

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