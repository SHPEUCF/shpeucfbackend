import * as functions from 'firebase-functions';
import { User } from "../Models/User";
import  { createUser } from '../Services/User';


export const create_User = functions.https.onRequest((request, response) => {
    const user: User = new User(request.body);
    createUser(user)
    .then(() => response.status(200).send('Good Job'))
    .catch(error => response.status(400).send(error));
});