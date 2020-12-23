import { getElectionsCollection } from '../Controller/Elections';
import { Election } from '../Models/Elections';

export const createElections = async () => {
	const electionsCollection = getElectionsCollection();
	let flag: number = 0;
	let newElection:Election = new Election({ votingOpen: false, applicationsOpen: false });

	await electionsCollection.doc('election').get().then((docSnapshot) => {
		if (!docSnapshot.exists) {
			electionsCollection.doc('election').set(newElection)
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		}
		else {
			flag = 1;
		}
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	return flag;
};

export const closeElections = () => {
	const electionsCollection = getElectionsCollection();

	electionsCollection.get()
		.then((QuerySnapshot) => {
			(QuerySnapshot.docs[0]).ref.update({ votingOpen: false, applicationsOpen: false })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const openElections = () => {
	const electionsCollection = getElectionsCollection();

	electionsCollection.get()
		.then((QuerySnapshot) => {
			(QuerySnapshot.docs[0]).ref.update({ votingOpen: true })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};