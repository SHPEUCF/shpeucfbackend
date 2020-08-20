// import { firebaseConfig } from 'firebase-functions';
// import * as functions from 'firebase-functions';
import { User } from "../Models/User";
import { db } from '../index';

// export const createUser = (user: User) => {
//     App.database().ref(`/users/${user.id}/`)
// 		.set(user)
// 		.then(() => {
// 			App.database().ref(`/points/${user.id}/`).set({
// 				firstName: user.firstName,
// 				lastName: user.lastName,
// 				points: 0,
// 				id: user.id
// 			});
// 		})
// 		.then(() => {
// 			App.database().ref(`/privileges/${user.id}/`).set({
// 				firstName: user.firstName,
// 				lastName: user.lastName,
// 				user: true,
// 				board: false,
// 				eboard: false,
// 				president: false,
// 				id: user.id,
// 				paidMember: false
// 			});
// 		})
// }

export const createUser = (user: User) => {
	// const docRef = db.collection('users').doc('user' + user.id);
	// docRef.set({
	//   first: user.firstName,
	//   last:  user.lastName,
	//   born: user.birthday,
	//   points: user.points,
	//   id: user.id,
	//   board: false,
	//   eboard: false,
	//   president: false,
	//   paidMember: false
	// });
	db.collection('users').add({
	  first: user.firstName,
	  last:  user.lastName,
	  born: user.birthday,
	  points: user.points,
	  id: user.id,
	  board: false,
	  eboard: false,
	  president: false,
	  paidMember: false
	});
}
