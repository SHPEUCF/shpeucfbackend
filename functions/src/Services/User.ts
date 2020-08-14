// const { App } = require('../app.js');
import * as App from 'firebase-admin';
import { User } from "../Models/User";


export const createUser = (user: User) => {
    App.database().ref(`/users/${user.id}/`)
		.set(user)
		.then(() => {
			App.database().ref(`/points/${user.id}/`).set({
				firstName: user.firstName,
				lastName: user.lastName,
				points: 0,
				id: user.id
			});
		})
		.then(() => {
			App.database().ref(`/privileges/${user.id}/`).set({
				firstName: user.firstName,
				lastName: user.lastName,
				user: true,
				board: false,
				eboard: false,
				president: false,
				id: user.id,
				paidMember: false
			});
		})
}

