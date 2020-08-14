// const { App } = require('../app.js');
import * as App from 'firebase-admin';
import { User } from "../Models/User";
import { Events } from "../Models/Events";


export const createEvent = (event: Events) => {
	App.database().ref("/events/").push({ ...event, eventActive: false, code: event.makeCode() })
	.then(snapshot => {
		App.database().ref(`/events/${snapshot.key}/id`).set(snapshot.key);
		// if (event.committee)
		// 	App.database().ref(`/committees/${event.committee}/events/`).update({ [snapshot.key]: true });
	})

};

export const editEvent = (event: Events) => {
	App.database().ref(`events/${event.id}`).once("value", snapshot => {
		if (snapshot.val())
			App.database().ref(`committees/${snapshot.val().committee}/events/`).update({ [event.id]: null });
	})
	App.database().ref(`/events/${event.id}`).update(event);
	if (event.committee)
		App.database().ref(`/committees/${event.committee}/events/`).update({ [event.id]: true });
}

export const rsvp = (event: Events, user: User) => {
	App.database().ref(`events/${event.id}/rsvp`).update({ [user.id]: !(user.id in event.rsvp) });
};

export const checkIn = (event: Events, user: User, showAlert = true) => {
	
	const rsvpBonus = event.rsvp && user.id in event.rsvp ? 1 : 0;

	const pointsAfterCheckIn = user.points + event.points + rsvpBonus;

	App.database().ref(`events/${event.id}/attendance`).update({ [user.id]: true })
		.then(() => { App.database().ref(`users/${user.id}/points`).set(pointsAfterCheckIn) })
		.then(() => { App.database().ref(`points/${user.id}/points`).set(pointsAfterCheckIn) })
		.then(() => {
			App.database().ref(`points/${user.id}/breakdown/${event.type}/${event.id}`)
				.set({
					type: event.type,
					date: event.date,
					name: event.name,
					points: event.points + rsvpBonus,
					rsvp: rsvpBonus === 1
				});
		})
};

export const deleteEvent = (event: Events) => {
	console.log(JSON.stringify(event));
	App.database().ref(`events/${event.id}`).set(null)
		.then(() => {
			App.database().ref(`committees/${event.committee}/events/`).update({ [event.id]: null });
		})
}

// exports.checkIn = checkIn;
// exports.deleteEvent = deleteEvent;
// exports.editEvent = editEvent;
// exports.createEvent = createEvent;
// exports.rsvp = rsvp;