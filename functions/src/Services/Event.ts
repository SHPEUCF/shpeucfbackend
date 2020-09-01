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
	eventCollection.doc(event.id).update({ ...event });
}

export const rsvp = (event: Event, user: User) => {
	// const doc = db.collection('events').doc(event.id);
	// if (!doc.create(rsvp))
	// {

	// }
	// const res = doc.update({rsvp: user.id});

	// App.database().ref(`events/${event.id}/rsvp`).update({ [user.id]: !(user.id in event.rsvp) });
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
	// console.log(JSON.stringify(event));
	// App.database().ref(`events/${event.id}`).set(null)
	// 	.then(() => {
	// 		App.database().ref(`committees/${event.committee}/events/`).update({ [event.id]: null });
	// 	})
};