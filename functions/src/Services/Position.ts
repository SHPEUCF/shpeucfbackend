// import * as functions from 'firebase-functions';
import { electionsConverter } from '../Models/Elections';
import { db } from '../index';
// import { firestore } from 'firebase-admin';
import { Position, positionConverter } from '../Models/Position';

export function getElectionsCollection() {
	return db.collection('elections').withConverter(electionsConverter);
}

export function getPositionCollection() {
	return db.collection('position').withConverter(positionConverter);
}

export const editPosition = async (pos: Position) => {
	let isOpen: boolean = false;
	// const updatePosition = firestore.FieldValue.arrayUnion({ ...pos });
	// const deletePosition = positionConverter.toFirestore(pos);
	let positionss: any;

	getElectionsCollection().get().then(QuerySnapshot => {
		(QuerySnapshot.docs[0]).ref.get().then(documentSnapshot => {
			isOpen = documentSnapshot.get('applicationsOpen');
			positionss = documentSnapshot.data()?.positions;
			// console.log(positionss);
			// console.log(isOpen);
			// we only want to update if applications are open
			if (isOpen) {
				console.log('isopen');
				for (let key of Object.keys(positionss)) {
					console.log('keys: ' + positionss.key);
					if (key == pos.title) {
						console.log('key: ' + key);
						console.log('value: ' + positionss[key]);
						positionss[key] = pos;
						break;
					}
				}

				// for (let props of positionss) {
				// 	console.log('props title: ' + props.title);
				// 	console.log('pos title: ' + pos.title);
				// 	if (props.title == pos.title) {
				// 		// update that one
				// 		console.log('updating: ' + props);
				// 		console.log('props decripstion: ' + props.description);
				// 		console.log('pos decripstion: ' + pos.description);

				// 		positionss[i] = pos;
				// 		console.log('updated props is : ' + props);
				// 		console.log('props decripstion: ' + props.description);
				// 	}
				// 	console.log(props);
				// }
				console.log('about to update: ' + JSON.parse(positionss));
				(QuerySnapshot.docs[0]).ref.update({ positions: positionss })
					.then(() => Promise.resolve())
					.catch(error => Promise.reject(error));
			}
		})
			.then(() => Promise.resolve())
			.catch(error => Promise.reject(error));
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};