import { getElectionsCollection } from '../Controller/Elections';
import { firestore } from 'firebase-admin';
import { Position } from '../Models/Position';

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

export const addPosition = (position: Position) =>{
	const electionsCollection = getElectionsCollection();
	const appendPosition = firestore.FieldValue.arrayUnion({ ...position });

	electionsCollection.get()
		.then((QuerySnapshot) => {
			(QuerySnapshot.docs[0]).ref.update({ positions: appendPosition })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};