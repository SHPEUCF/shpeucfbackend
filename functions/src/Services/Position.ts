import { ElectionPosition } from '../Models/Position';
import { getPositionCollection } from '../Controller/Position';
import { getElectionCollection } from '../Controller/Election';

export const addPosition = async (position: ElectionPosition) =>{
	const positionCollection = getPositionCollection();
	const electionCollection = getElectionCollection();
	let msg: String = 'Good Job';

	await electionCollection.doc('election').get().then((documentSnapshot)=>{
		if (documentSnapshot.data() != null) {
			if (documentSnapshot.data()!.applicationsOpen) {
				positionCollection.doc(position.title).set(position)
					.then(() => Promise.resolve())
					.catch(error => Promise.reject(error));
			}
			else {
				msg = 'Applications are not open, position was not added';
			}
		}
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	return msg;
};