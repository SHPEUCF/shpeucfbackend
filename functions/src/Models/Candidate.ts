import firebase from 'firebase-admin';
import { User } from './User';

// digest elections model and construct
export class Candidate {
	userId: string = '';
	candidateFName: string = '';
	candidateLName: string = '';
	candidatePlan: string = '';
	positionId: string = '';
	approved: boolean | null = null;
	applyPosition: string = '';
	votesFromMembers: User[] = [];

	constructor(candidate: Partial<Candidate> = {}) {
		Object.assign(this, candidate);
	}
}

export const candidateConverter = {
	toFirestore: function(candidate: Candidate): firebase.firestore.DocumentData {
		const { userId, candidateFName, candidateLName, candidatePlan, positionId,
			approved, applyPosition, votesFromMembers } = candidate;

		return { userId, candidateFName, candidateLName, candidatePlan, positionId,
				 approved, applyPosition, votesFromMembers };
	},
	fromFirestore: function(snapshot: firebase.firestore.DocumentData): Candidate {
		const data = snapshot;

		return new Candidate(data);
	}
};