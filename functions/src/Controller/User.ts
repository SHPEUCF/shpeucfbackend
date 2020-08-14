import * as functions from 'firebase-functions';
import { User } from "../Models/User";
import  { createUser } from '../Services/User';
export const App = require('firebase-admin');
App.initializeApp(functions.firebaseConfig())


export const create_User = functions.https.onRequest((request, response) => {
    const user: User = new User(request.body);
    createUser(user);
    response.status(200).send('Good Job');
});