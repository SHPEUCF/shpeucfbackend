import { User, userConverter } from "../Models/User";
// import { firestore } from 'firebase-admin';
import { db } from '../index';

export const createUser = (user: any) => {

	// gets or creates users collection then converters user data to firestore data
	const userCollection = db.collection('users').withConverter(userConverter);

	// adds our new user to our collections
	// tslint:disable-next-line: no-floating-promises
	userCollection.add(new User(user));
};
