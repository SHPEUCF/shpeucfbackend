import { User, userConverter } from '../Models/User';
import { db } from '../index';

export const createUser = async (user: User) => {
	const userCollection = db.collection('users').withConverter(userConverter);

	userCollection.doc(user.id).set(user)
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};