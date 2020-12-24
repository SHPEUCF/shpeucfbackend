import { getElectionCollection, getCandidateCollection } from '../Controller/Elections';
import { getPositionCollection } from '../Controller/Position';
import { Candidate } from '../Models/Candidate';

export const closeElections = () => {
	const electionCollection = getElectionCollection();

	electionCollection.get()
		.then((QuerySnapshot) => {
			(QuerySnapshot.docs[0]).ref.update({ votingOpen: false, applicationsOpen: false })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const openElections = () => {
	const electionCollection = getElectionCollection();

	electionCollection.get()
		.then((QuerySnapshot) => {
			(QuerySnapshot.docs[0]).ref.update({ votingOpen: true })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const addApplication = async (candidate: Candidate) => {
	const positionCollection = getPositionCollection();
	let msg: String = 'Good Job';

	await positionCollection.doc(candidate.applyPosition).collection('candidates')
		.doc(candidate.userId).get()
		.then((doc) => {
			if (doc.exists) {
				if (!doc.get('approved')) {
					msg = 'Application was rejected';
				}
				else {
					positionCollection.doc(candidate.applyPosition).collection('candidates')
						.doc(candidate.userId)
						.set({ ...candidate })
						.then(() => Promise.resolve())
						.catch(error => Promise.reject(error));

					msg = 'Good Job, updating application';
				}
			}
			else {
				positionCollection.doc(candidate.applyPosition).collection('candidates')
					.doc(candidate.userId)
					.set({ ...candidate })
					.then(() => Promise.resolve())
					.catch(error => Promise.reject(error));
				msg = 'Good Job, creating application';
			}
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	return msg;
};

export const approveApplication = (candidate: Candidate) => {
	const candidateCollection = getCandidateCollection(candidate);

	candidateCollection.doc(candidate.userId).update({ approved: candidate.approved })
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};