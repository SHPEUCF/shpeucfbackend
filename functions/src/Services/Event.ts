import { User } from "../Models/User";
import { Event, eventConverter } from "../Models/Event";
import { firestore } from 'firebase-admin';

/**
 * Handles retrieving the event collection with the converter.
 */
function getEventCollection() {
	return firestore().collection('events').withConverter(eventConverter);
}

export const createEvent = (event: Event) => {
	const eventCollection = getEventCollection();
	eventCollection.add(event);
};

/**
 * The eventConverter only works with set and get, so the `event` is unpacked and passed in as a generic object.
 */
export const editEvent = (event: Event) => {
	const eventCollection = getEventCollection();
	eventCollection.doc(event.id).update({ ...event })
	.then(() => Promise.resolve())
	.catch(error => Promise.reject(error));
}

/**
 * Adds User's doc id to the Event's rsvp list, then updates the Event document
 * to contain the new list.
 */
export const rsvp = (event: Event, user: User) => {
	const eventCollection = getEventCollection();
	event.rsvp.push(user.id);
	eventCollection.doc(event.id).update({rsvp: event.rsvp});
};

export const checkIn = (event: Event, user: User, showAlert = true) => {

	// const rsvpBonus = event.rsvp && user.id in event.rsvp ? 1 : 0;

	// const pointsAfterCheckIn = user.points + event.points + rsvpBonus;

	// App.database().ref(`events/${event.id}/attendance`).update({ [user.id]: true })
	// 	.then(() => { App.database().ref(`users/${user.id}/points`).set(pointsAfterCheckIn) })
	// 	.then(() => { App.database().ref(`points/${user.id}/points`).set(pointsAfterCheckIn) })
	// 	.then(() => {
	// 		App.database().ref(`points/${user.id}/breakdown/${event.type}/${event.id}`)
	// 			.set({
	// 				type: event.type,
	// 				date: event.date,
	// 				name: event.name,
	// 				points: event.points + rsvpBonus,
	// 				rsvp: rsvpBonus === 1
	// 			});
	// 	})
};

export const deleteEvent = (event: Event) => {
	const eventRef = getEventCollection();
	eventRef.doc(event.id).delete()
	.then(() => Promise.resolve())
	.catch(error => Promise.reject(error));
};