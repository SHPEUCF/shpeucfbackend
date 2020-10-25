import { createEvent, deleteEvent, editEvent, checkIn, rsvp, getEvent } from '../Services/Event';
import { Event, eventConverter } from '../Models/Event';
import { User, userConverter } from '../Models/User';
import { db } from '../index';
import * as functions from 'firebase-functions';

/**
 * Handles retrieving the event collection with the converter.
 */
function getEventCollection() {
	return db.collection('events').withConverter(eventConverter);
}

/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return db.collection('users').withConverter(userConverter);
}

export const createEventController = functions.https.onRequest((request, response) => {
	const event: Event = new Event(request.body);

	createEvent(event);
	response.status(200).send('Good Job');
});

export const editEventController = functions.https.onRequest(async (request, response) => {
	const event: Event = new Event(request.body);
	const eventCollection = getEventCollection();
	const eventDoc = eventCollection.doc(event.id);

	/**
	 * If Event document exists, complete editEvent function.
	 */
	await eventDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			editEvent(event);
			response.status(200).send('Good Job');
		}
		else {
			response.status(404).send('Error 404: Event document not found');
		}
	});
});

export const checkInController = functions.https.onRequest(async (request, response) => {
	const event: Event = new Event(request.body[0]);
	const user: User = new User(request.body[1]);
	const eventCollection = getEventCollection();
	const userCollection = getUserCollection();
	const eventDoc = eventCollection.doc(event.id);
	const userDoc = userCollection.doc(user.id);
	let validEvent = false;
	let validUser = false;

	/**
	 * Checks if Event document exists.
	 */
	await eventDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validEvent = true;
	});

	/**
	 * Checks if User document exists.
	 */
	await userDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validUser = true;
	});

	/**
	 * If both documents exist, complete checkIn function.
	 */
	if (validEvent && validUser) {
		checkIn(event, user);
		response.status(200).send('Good Job');
	}
	else if (!validEvent && !validUser) {
		response.status(404).send('Error 404: Event document not found\nError 404: User document not found');
	}
	else if (!validEvent) {
		response.status(404).send('Error 404: Event document not found');
	}
	else {
		response.status(404).send('Error 404: User document not found');
	}
});

export const deleteEventController = functions.https.onRequest(async (request, response) => {
	const event: Event = new Event(request.body);
	const eventCollection = getEventCollection();
	const eventDoc = eventCollection.doc(event.id);

	/**
	 * If Event document exists, complete deleteEvent function.
	 */
	await eventDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists) {
			deleteEvent(event);
			response.status(200).send('Good Job');
		}
		else {
			response.status(404).send('Error 404: Event document not found');
		}
	});
});

export const rsvpController = functions.https.onRequest(async (request, response) => {
	const event: Event = new Event(request.body[0]);
	const user: User = new User(request.body[1]);
	const eventCollection = getEventCollection();
	const userCollection = getUserCollection();
	const eventDoc = eventCollection.doc(event.id);
	const userDoc = userCollection.doc(user.id);
	let validEvent = false;
	let validUser = false;

	/**
	 * Checks if Event document exists.
	 */
	await eventDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validEvent = true;
	});

	/**
	 * Checks if User document exists.
	 */
	await userDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validUser = true;
	});

	/**
	 * If both documents exist, complete rsvp function.
	 */
	if (validEvent && validUser) {
		rsvp(event, user);
		response.status(200).send('Good Job');
	}
	else if (!validEvent && !validUser) {
		response.status(404).send('Error 404: Event document not found\nError 404: User document not found');
	}
	else if (!validEvent) {
		response.status(404).send('Error 404: Event document not found');
	}
	else {
		response.status(404).send('Error 404: User document not found');
	}
});

export const getEventController = functions.https.onRequest(async (request, response) => {
	const event: Event = new Event(request.body);
	const eventCollection = getEventCollection();
	const eventDoc = eventCollection.doc(event.id);
	let validEvent = false;

	/**
	 * Checks if Event document exists.
	 */
	await eventDoc.get().then((docSnapshot) => {
		if (docSnapshot.exists)
			validEvent = true;
	});

	if (validEvent) {
		getEvent(event);
		response.status(200).send('Good Job');
	}
	else {
		response.status(404).send('Error 404: Event document not found');
	}
});