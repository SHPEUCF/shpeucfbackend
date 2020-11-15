import { getElectionsCollection } from '../Controller/Elections';
import { Position, positionConverter } from '../Models/Position';
import { firestore } from 'firebase-admin';

export const deletePosition = (position : Position) => {
	const electionsCollection = getElectionsCollection();
	const convertedPosition = positionConverter.toFirestore(position);

	electionsCollection.get().then((QuerySnapshot) => {
		(QuerySnapshot.docs[0]).ref.update({ positions: firestore.FieldValue.arrayRemove(convertedPosition) })
			.then(() => Promise.resolve())
			.catch(error => Promise.reject(error));
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};