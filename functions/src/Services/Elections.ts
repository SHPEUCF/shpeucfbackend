import { getElectionCollection, getCandidateCollection } from '../Controller/Elections';
import { getPositionCollection } from '../Controller/Position';
import { Candidate } from '../Models/Candidate';

export const closeElections = () => {
	const electionsCollection = getElectionCollection();

	electionsCollection.get()
		.then((QuerySnapshot) => {
			(QuerySnapshot.docs[0]).ref.update({ votingOpen: false, applicationsOpen: false })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const openElections = () => {
	const electionsCollection = getElectionCollection();

	electionsCollection.get()
		.then((QuerySnapshot) => {
			(QuerySnapshot.docs[0]).ref.update({ votingOpen: true })
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const addApplication = (candidate: Candidate) => {
	const positionCollection = getPositionCollection();

	positionCollection.doc(candidate.applyPosition).collection('candidates')
	.add({ ...candidate })
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
}

export const approveApplication = (candidate: Candidate) => {
	const candidateCollection = getCandidateCollection(candidate);

	candidateCollection.doc(candidate.id).update({ approved: true })
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
}