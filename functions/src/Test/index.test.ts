// eslint-disable-next-line camelcase
import { create_Event } from '../Controller/Event';
import 'jest';
// import test from 'firebase-functions-test';

// const testEnv = test();
// const config = {
// 	apiKey: process.env.apiKey,
// 	authDomain: process.env.authDomain,
// 	databaseURL: process.env.databaseURL,
// 	projectId: process.env.projectId,
// 	storageBucket: process.env.storageBucket,
// 	messagingSenderId: process.env.messagingSenderId,
// 	appId: process.env.appId
// };

// const test = require('firebase-functions-test')();
// const key = functions.config();

// test.mockConfig({ stripe: { key: '23wr42ewr34' } });

describe('my functions', () => {
    // let adminStub; let api;
	// let wrapped;

	// beforeAll(() => {
	// 	// you can use `sinon.stub` instead
	// 	adminStub = jest.spyOn(admin, 'initializeApp');

	// 	// after initializeApp call, we load our functions
	// 	api = require('../index');
	// });

	// afterAll(() => {
	// 	// clean things up
	// 	adminStub.mockRestore();
	// 	test().cleanup();

	// 	// reset our database
	// 	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	// 	admin
	// 		.database()
	// 		.ref('users')
	// 		.remove();
	// });

	it('so see if testing works', async () => {
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

	it('test to see if testing works', () => {
		// meanlessing test just to test if jest is working for testing
		expect(1).toBe(1);
	});
});