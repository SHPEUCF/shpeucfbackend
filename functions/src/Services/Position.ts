import { getElectionsCollection } from '../Controller/Elections';
import { Position } from '../Models/Position';
import { firestore } from 'firebase-admin';

export const deletePosition = (position : Position) => {
	const electionsCollection = getElectionsCollection();
	const positionToRemove = firestore.FieldValue.arrayRemove({ ...position });

	electionsCollection.get().then((QuerySnapshot) => {
		if (QuerySnapshot.docs[0].data().applicationsOpen == true) {
			(QuerySnapshot.docs[0]).ref.update({ positions: positionToRemove })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		}
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};