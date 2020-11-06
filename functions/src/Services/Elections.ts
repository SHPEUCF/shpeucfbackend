import { getElectionsCollection } from '../Controller/Elections';

export const closeElections = () => {
	const electionsCollection = getElectionsCollection();

	electionsCollection.get()
		.then((querySnapshot) => {
			(querySnapshot.docs[0]).ref.update({ votingOpen: false, applicationsOpen: false })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};