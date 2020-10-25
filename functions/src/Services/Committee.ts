import { getCommitteeCollection } from '../Controller/Committee';
import { Committee } from '../Models/Committee';

export const addCommittee = (committee:Committee) => {
	const committeeCollection = getCommitteeCollection();

	committeeCollection.add(committee)
		.then((documentSnapshot) => committeeCollection.doc(documentSnapshot.id).update({ id: documentSnapshot.id }))
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const editCommittee = (committee:Committee) => {
	const committeeCollection = getCommitteeCollection();

	committeeCollection.doc(committee.id).update({ ...committee })
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

/**
 * Returns all existing committees in the committee collection, this function returns a list of committees,
 * since firestore doesn't allow for an entire collection to be returned as a JSON object.
 */
export const getCommittees = async () => {
	const committeeCollection = getCommitteeCollection();
	let committees: Committee[] = [];

	await committeeCollection.get()
		.then(querySnapshot => {
			committees = querySnapshot.docs.map((documentSnapshot) => {
				return documentSnapshot.data();
			});
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	return committees;
};

export const deleteCommittee = (committee: Committee["id"]) => {
	const committeeRef = getCommitteeCollection();

	committeeRef.doc(committee).delete()
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};