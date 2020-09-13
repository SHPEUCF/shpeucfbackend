// eslint-disable-next-line camelcase
import { create_Event } from '../Controller/Event';
import 'jest';
import { Event } from '../Models/Event';
import * as firebase from '@firebase/testing';
// import test from 'firebase-functions-test';
import { createEvent } from '../Services/Event';

firebase.initializeTestApp({
	projectId: 'my-test-project',
	auth: { uid: 'alice', email: 'alice@example.com' }
});

firebase.initializeAdminApp({ projectId: 'my-test-project' });

describe('my functions', () => {
	xit('it should send http function req and res', async () => {
		const req = { testQuery: {
			test: 'is this getting pasted',
			otherRq: 'something else'
		} };
		const res = {
			send: (payload: Event) => {
				expect(payload).toBe('good job');
			}
		};

		void create_Event(req as any, res as any);
	});

	it('it should test non http functions', () => {
		const event = {
			firstname: 'sofia',
			lastname: 'montana',
			major: 'cs',
			rsvp: [' '],
			date: '1/5',
			startTime: '12:00pm',
			endTime: '1:00pm',
			location: 'orlando',
			points: '0',
			committee: 'tech',
			type: 'noon',
			id: '39393'
		};
		const snap = new Event(event);

		expect(createEvent(snap)).toEqual(snap);
	});

	it('it should works', () => {
		// meanlessing test just to test if jest is working for testing
		expect(1).toBe(1);
	});
});