import { createEvent, deleteEvent, editEvent, checkIn, rsvp } from '../Services/Event';
import { Event } from "../Models/Event";
import { User } from "../Models/User";
import * as functions from 'firebase-functions';

//good
export const create_Event = functions.https.onRequest((request, response) => { 
	const event: Event = new Event(request.body);
	createEvent(event);
	response.status(200).send('Good Job');
});

export const edit_Event = functions.https.onRequest((request, response) => {
	const event: Event = new Event(request.body);
	editEvent(event);
	response.status(200).send('Good Job');
});

export const check_In = functions.https.onRequest((request, response) => {
		const event: Event = new Event(request.body[0]);
		const user: User = new User(request.body[1]);
		checkIn(event, user);
		response.status(200).send('Good Job');
});

export const delete_Event = functions.https.onRequest((request, response) => {
	const event: Event = new Event(request.body);
	deleteEvent(event);
	response.status(200).send('Good Job');
});

export const rsvps = functions.https.onRequest((request, response) => {
	const event: Event = new Event(request.body);
	const user: User = new User(request.body);
	rsvp(event, user);
	response.status(200).send('Good Job');
});