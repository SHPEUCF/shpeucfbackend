import { firestore } from 'firebase-admin';
import { Position } from '../Models/Position';
import { getElectionsCollection } from '../Controller/Elections';

export const addPosition = (position: Position) =>{
	const electionsCollection = getElectionsCollection();
	const appendPosition = firestore.FieldValue.arrayUnion({ ...position });

	electionsCollection.get()
		.then((QuerySnapshot) => {
			if (QuerySnapshot.docs[0].data().applicationsOpen == true) {
				(QuerySnapshot.docs[0]).ref.update({ positions: appendPosition })
					.then(() => Promise.resolve())
					.catch(error => Promise.reject(error));
			}
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};