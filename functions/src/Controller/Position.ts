import * as functions from 'firebase-functions';
import { Position } from '../Models/Position';
import { deletePosition } from '../Services/Position';

export const deletePositionController = functions.https.onRequest((request, response) => {
	const position : Position = new Position(request.body);

	deletePosition(position);

	response.status(200).send('Good Job');
});