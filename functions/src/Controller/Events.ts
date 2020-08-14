import { createEvent, deleteEvent, editEvent, checkIn, rsvp } from '../Services/Events';
import { Events } from "../Models/Events";
import { User } from "../Models/User";
import * as functions from 'firebase-functions';

//good
export const create_Event = functions.https.onRequest((request, response) => { 
	const event: Events = new Events(request.body);
	createEvent(event);
	response.status(200).send('Good Job');
});

export const edit_Event = functions.https.onRequest((request, response) => {
	const event: Events = new Events(request.body);
	editEvent(event);
	response.status(200).send('Good Job');
});

export const check_In = functions.https.onRequest((request, response) => {
		const event: Events = new Events(request.body.event);
		const user: User = new User(request.body.user);
		checkIn(event, user);
		response.status(200).send('Good Job');
});

export const delete_Event = functions.https.onRequest((request, response) => {
	const event: Events = new Events(request.body);
	deleteEvent(event);
	response.status(200).send('Good Job');
});

export const rsvps = functions.https.onRequest((request, response) => {
	const event: Events = new Events(request.body);
	const user: User = new User(request.body);
	rsvp(event, user);
	response.status(200).send('Good Job');
});