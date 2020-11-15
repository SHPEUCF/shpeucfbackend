import * as functions from 'firebase-functions';
import { Position } from '../Models/Position';
import { addPosition } from '../Services/Position';

export const addPositionController = functions.https.onRequest((request, response) => {
	const position: Position = new Position(request.body);

	addPosition(position);
	response.status(200).send('Good Job');
});