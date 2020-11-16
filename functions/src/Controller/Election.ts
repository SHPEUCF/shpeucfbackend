import { electionConverter } from '../Models/Election';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { openElection } from '../Services/Election';

export function getElectionCollection() {
	return db.collection('election').withConverter(electionConverter);
}

export const openElectionsController = functions.https.onRequest((request, response) => {
	openElection();
	response.status(200).send('Good Job');
});