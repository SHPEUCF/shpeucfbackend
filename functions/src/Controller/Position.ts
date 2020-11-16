import * as functions from 'firebase-functions';
import { db } from '..';
import { ElectionPosition, positionConverter } from '../Models/Position';
import { addPosition } from '../Services/Position';

export function getPositionCollection() {
	return db.collection('election').doc('election').collection('positions').withConverter(positionConverter);
}

export const addPositionController = functions.https.onRequest(async (request, response) => {
	const position: ElectionPosition = new ElectionPosition(request.body);

	addPosition(position).then((msg)=>{
		if (msg == 'Good Job')
			response.status(200).send('Good Job');
		else
			response.status(403).send(msg);
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
});