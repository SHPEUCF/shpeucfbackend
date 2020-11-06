import firebase from 'firebase-admin';
import { User } from './User';

// digest elections model and construct
export class Candidate {
	id: string = '';
	candidateFName: string = '';
	candidateLName: string = '';
	candidatePlan: string = '';
	positionId: string = '';
	approved: boolean = false;
	applyPosition: string = '';
	votesFromMembers: User[] = [];

	constructor(candidate: Partial<Candidate> = {}) {
		Object.assign(this, candidate);
	}
}

export const candidateConverter = {
	toFirestore: function(candidate: Candidate): firebase.firestore.DocumentData {
		const { id, candidateFName, candidateLName, candidatePlan, applyPosition,
			approved, votesFromMembers } = candidate;

		return { id, candidateFName, candidateLName, candidatePlan, applyPosition,
				 approved, votesFromMembers };
	},
	fromFirestore: function(snapshot: firebase.firestore.DocumentData): Candidate {
		const data = snapshot;

		return new Candidate(data);
	}
};