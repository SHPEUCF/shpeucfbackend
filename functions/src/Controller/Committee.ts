import { addCommittee, getCommittees, editCommittee, deleteCommittee, changeDisplayOrder } from '../Services/Committee';
import { Committee, committeeConverter } from '../Models/Committee';
import * as functions from 'firebase-functions';
import { db } from '../index';

/**
 * declared getCommitteeCollection here for easy export and import into other files.
 */
export function getCommitteeCollection() {
	return db.collection('committees').withConverter(committeeConverter);
}

export const addCommitteeController = functions.https.onRequest((request, response) => {
	const committee: Committee = new Committee(request.body);

	addCommittee(committee)
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	response.status(200).send('Good Job');
});

export const getCommitteesController = functions.https.onRequest((request, response) => {
	getCommittees()
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	response.status(200).send('Good Job');
});

export const editCommitteeController = functions.https.onRequest(async (request, response) => {
	const committee: Committee = new Committee(request.body);
	const committeeDoc = getCommitteeCollection().doc(committee.id);

	await committeeDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			editCommittee(committee);
			response.status(200).send('Good Job');
		}
		else {
			response.status(404).send('Error 404: Committee document not found');
		}
	});
});

export const deleteCommitteeController = functions.https.onRequest(async (request, response) => {
	const committeeCollection = getCommitteeCollection();
	const id = request.body.id;
	const committeeRef = committeeCollection.doc(id);

	await committeeRef.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			deleteCommittee(id)
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));

			response.status(200).send('Good Job');
		}
		else {
			response.status(404).send('Error 404: Committee document not found');
		}
	});
});

export const changeDisplayOrderController = functions.https.onRequest(async (request, response) => {
	const committee: Committee = new Committee(request.body);
	const committeeCollection = getCommitteeCollection();
	const committeeDoc = committeeCollection.doc(committee.id);

	await committeeDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			changeDisplayOrder(committee)
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));

			response.status(200).send('Good job');
		}
		else {
			response.status(404).send('Error 404: Committee document not found');
		}
	});
});