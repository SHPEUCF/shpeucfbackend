import { db } from '..';
import { positionConverter } from '../Models/Position';

export function getPositionCollection() {
	return db.collection('election').doc('election').collection('positions').withConverter(positionConverter);
}