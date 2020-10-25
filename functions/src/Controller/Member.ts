import { Member } from '../Models/Member';
import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { User, userConverter } from '../Models/User';
import { editMember } from '../Services/Member';

function getUserCollection() {
	return firestore().collection('users').withConverter(userConverter);
}

export const editMembersController = functions.https.onRequest(async (request, response) => {
	const member: Member = new Member(request.body[1]);
	const user: User = new User(request.body[0]);
	const userCollection = getUserCollection();
	const userDoc = userCollection.doc(user.id);

	/**
	 * If the User document exists, complete the editMember function.
	 */
	await userDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			editMember(user, member);
			response.status(200).send('Good Job');
		}
		else {
			response.status(404).send('Error 404: User document not found');
		}
	});
});