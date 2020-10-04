import { getCommitteeCollection } from '../Controller/Committee';
import { Committee } from '../Models/Committee';

export const addCommittee = (committee:Committee) => {
	const committeeCollection = getCommitteeCollection();

	committeeCollection.doc(committee.title).set(committee)
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

/**
 * Returns all existing committees in the committee collection, this function returns a list of JSON objects, since firestore seems to operate this way.
 */
export const getCommittees = async () => {
	const committeeCollection = getCommitteeCollection();
	let committees;

	await committeeCollection.get()
		.then(querySnapshot => {
			committees = querySnapshot.docs.map((documentSnapshot) => {
				return { id: documentSnapshot.id, ...documentSnapshot.data() };
			});
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	console.log(committees);

	return committees;
};