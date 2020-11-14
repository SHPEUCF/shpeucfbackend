import { getElectionsCollection } from '../Controller/Elections';

export const closeElections = () => {
	const electionsCollection = getElectionsCollection();

	electionsCollection.get()
		.then((querySnapshot) => {
			(querySnapshot.docs[0]).ref.update({ votingOpen: false, applicationsOpen: false })
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