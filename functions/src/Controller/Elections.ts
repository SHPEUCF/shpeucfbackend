import { electionConverter } from '../Models/Elections';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { closeElections } from '../Services/Elections';
import { openElections } from '../Services/Elections';
import { addApplication, approveApplication } from '../Services/Elections';
import { Candidate } from '../Models/Candidate';

export function getElectionCollection() {
	return db.collection('election').withConverter(electionConverter);
}

export function getCandidateCollection(candidate: Candidate) {
	return db.collection('election').doc('election').collection('positions').doc(candidate.applyPosition).collection('candidates');
}

export const closeElectionsController = functions.https.onRequest((request, response) => {
	closeElections();
	response.status(200).send('Good Job');
});

export const openElectionsController = functions.https.onRequest((request, response) => {
	openElections();
	response.status(200).send('Good Job');
});

export const addApplicationController = functions.https.onRequest(async (request, response) => {
	const candidateApplication: Candidate = new Candidate(request.body);

	await addApplication(candidateApplication).then((msg) => {
		if (msg == 'Good Job')
			response.status(200).send('Good Job');
		else
			response.status(403).send(msg);
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
});

export const approveApplicationController = functions.https.onRequest((request, response) => {
	const candidate: Candidate = request.body;

	approveApplication(candidate);
	response.status(200).send('Good Job');
});