import { User } from "../Models/User";
import { Event, eventConverter } from "../Models/Event";
import { firestore } from 'firebase-admin';

// Creates an event document and adds it to the events collection.
export const createEvent = (event: any) => {
    // Retrieve the events collection with a converter to be able to convert generic types of data to Firestore data.
    // Here, we convert event objects to Firestore data.
    const eventCollection = firestore().collection('events').withConverter(eventConverter);

    // Add new event document to events collection.
	eventCollection.add(new Event(event));
};

export const editEvent = (event: Event) => {
	// App.database().ref(`events/${event.id}`).once("value", snapshot => {
	// 	if (snapshot.val())
	// 		App.database().ref(`committees/${snapshot.val().committee}/events/`).update({ [event.id]: null });
	// })
	// App.database().ref(`/events/${event.id}`).update(event);
	// if (event.committee)
	// 	App.database().ref(`/committees/${event.committee}/events/`).update({ [event.id]: true });
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