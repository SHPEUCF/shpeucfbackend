import { electionsConverter } from '../Models/Elections';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { closeElections } from '../Services/Elections';
import { openElections } from '../Services/Elections';
import { approveApplication } from '../Services/Elections';
import { Candidate } from '../Models/Candidate';


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

export const approveApplication = functions.https.onRequest((request, response) => {
	const candidateApplication: Candidate = new Candidate(request.body);

	approveApplication(candidateApplication);
	response.status(200).send('Good Job');
});