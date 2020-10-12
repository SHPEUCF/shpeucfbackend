import { addCommittee, deleteCommittee, getCommittees } from '../Services/Committee';
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

	addCommittee(committee);
	response.status(200).send('Good Job');
});

export const getCommitteesController = functions.https.onRequest((request, response) => {
	void getCommittees();
	response.status(200).send('Good Job');
});

export const deleteCommitteeController = functions.https.onRequest( async ( request, response) => {
	const committee: Committee = new Committee(request.body);
	const committeeCollection = getCommitteeCollection();
	const committeeRef = committeeCollection.doc(committee.title);

	await committeeRef.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			deleteCommittee(committee);
			response.status(200).send('Good job');
		}
		else {
			response.status(404).send('Error 404: Committee document not found');
		}
	});
});