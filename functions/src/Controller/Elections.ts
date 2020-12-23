import { electionsConverter } from '../Models/Elections';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { closeElections, createElections, openElections } from '../Services/Elections';

export function getElectionsCollection() {
	return db.collection('elections').withConverter(electionsConverter);
}

export const createElectionsController = functions.https.onRequest(async (request, response) => {
	createElections().then((flag) => {
		if (flag == 1)
			response.status(403).send('An election already exists');
		else
			response.status(200).send('Good Job');
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
});

export const closeElectionsController = functions.https.onRequest((request, response) => {
	closeElections();
	response.status(200).send('Good Job');
});

export const openElectionsController = functions.https.onRequest((request, response) => {
	openElections();
	response.status(200).send('Good Job');
});