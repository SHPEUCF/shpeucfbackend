import { Member } from '../Models/Member';
import * as functions from 'firebase-functions';
import { db } from '../index';
import { userConverter } from '../Models/User';
import { editMember } from '../Services/Member';

function getUserCollection() {
	return db.collection('users').withConverter(userConverter);
}

export const editMembersController = functions.https.onRequest(async (request, response) => {
	const member: Member = new Member(request.body[0]);
	const userCollection = getUserCollection();
	const userDoc = userCollection.doc(member.id);

	/**
	 * If the User document exists, complete the editUser function.
	 */
	await userDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			editMember(member);
			response.status(200).send('Good Job');
		}
		else {
			response.status(404).send('Error 404: User document not found');
		}
	});
});