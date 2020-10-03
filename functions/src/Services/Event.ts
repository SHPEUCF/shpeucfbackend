import { User, userConverter } from '../Models/User';
import { Event, eventConverter } from '../Models/Event';
import { firestore } from 'firebase-admin';

/**
 * Handles retrieving the event collection with the converter.
 */
function getEventCollection() {
	return firestore().collection('events').withConverter(eventConverter);
}

/**
 * Handles retrieving the user collection with the converter.
 */
function getUserCollection() {
	return firestore().collection('users').withConverter(userConverter);
}

export const createEvent = (event: Event) => {
	const eventCollection = getEventCollection();

	eventCollection.add(event)
		.then((documentSnapshot)=> {
			eventCollection.doc(documentSnapshot.id).update({ id: documentSnapshot.id})
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

/**
 * The eventConverter only works with set and get, so the `event` is unpacked and passed in as a generic object.
 */
export const editEvent = (event: Event) => {
	const eventCollection = getEventCollection();

	eventCollection.doc(event.id).update({ ...event })
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

/**
 * Adds the user's id to an event's rsvp list.
 */
export const rsvp = (event: Event, user: User) => {
	const eventCollection = getEventCollection();
	const newRSVP = firestore.FieldValue.arrayUnion(user.id);

	eventCollection.doc(event.id).update({ rsvp: newRSVP })
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

/**
 * userReference and eventReference do not use their respective converters, because they're stored as documentReferences in the firestore
 */
export const checkIn = (event: Event, user: User, showAlert = true) => {
	const rsvpBonus = (event.rsvp && user.id in event.rsvp) ? 1 : 0;
	const pointsAfterCheckIn = user.points + event.points + rsvpBonus;
	const userReference = firestore().collection('users').doc(user.id);
	const eventReference = firestore().collection('events').doc(event.id);

	getEventCollection().doc(event.id).collection('attendees').doc(user.id).set({ userRef: userReference })
		.then(() => {
			getUserCollection().doc(user.id).update({ points: pointsAfterCheckIn })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
			getUserCollection().doc(user.id).collection('eventsAttended').doc(event.id).set({ eventRef: eventReference })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const deleteEvent = (event: Event) => {
	const eventRef = getEventCollection();

	eventRef.doc(event.id).delete()
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

/**
 * This function was used for testing the attendees subCollection inside of events.
 *
 * I decided to keep the function as it could serve well for future reference when making a real getEvent function,
 * or whenever we have to deal with retrieving subCollections.
 */
export const getEvent = (event: Event) => {
	const eventRef = getEventCollection().doc(event.id);

	eventRef.get()
		.then(documentSnapshot => console.log(documentSnapshot.data()))
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	eventRef.collection('attendees').get()
		.then(querySnapshot => querySnapshot.forEach(
			documentSnapshot => {
				documentSnapshot.data().userRef.get()
					.then((userSnapshot: firestore.DocumentSnapshot) => console.log(userSnapshot.data()))
					.then(() => Promise.resolve())
					.catch((error: string) => Promise.reject(error));
			}))
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};