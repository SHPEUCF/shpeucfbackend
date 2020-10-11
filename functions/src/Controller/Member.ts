import { Member, memberConverter } from '../Models/Member';
import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { User, userConverter } from '../Models/User';
import { editMember, assignPosition } from '../Services/Member';
import { committeeConverter } from '../Models/Committee';

function getUserCollection() {
	return firestore().collection('users').withConverter(userConverter);
}

function getCommitteeCollection() {
	return firestore().collection('committees').withConverter(committeeConverter);
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

export const assignPositionController = functions.https.onRequest(async (request, response) => {
	const user: User = new User(request.body[0]);
	const member: Member = new Member(request.body[1]);

	const userCollection = getUserCollection();
	const userDoc = userCollection.doc(user.id);

	const memberDoc = userDoc.collection('member').withConverter(memberConverter).doc(member.id);

	const committeeCollection = getCommitteeCollection();
	const committeeDoc = committeeCollection.doc(member.committeeTitle);

	let validUser = false;
	let validMember = false;
	let validCommittee = false;

	await userDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validUser = true;
	});

	await memberDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validMember = true;
	});

	await committeeDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validCommittee = true;
	});

	let errorResponse = '';

	/**
	 * Creates our error messages.
	 */
	if (!validUser)
		errorResponse += 'Error 404: User document not found\n';
	if (!validMember)
		errorResponse += 'Error 404: Member document not found\n';
	if (!validCommittee)
		errorResponse += 'Error 404: Committee document not found';

	if (validUser && validMember && validCommittee) {
		assignPosition(user, member);
		response.status(200).send('Good Job');
	}
	else {
		response.status(404).send(errorResponse);
	}
});