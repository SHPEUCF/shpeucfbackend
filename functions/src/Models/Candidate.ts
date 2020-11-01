import firebase from 'firebase-admin';
import { User } from "./User";

// digest elections model and construct
export class Candidate {
	id: string = "";
	candidateFName: string = "";
	candidateLName: string = "";
	candidatePlan: string = "";
	applyPosition: string = "";
	approved: boolean = false;
	votesFromMembers: User[] = [];
    
    constructor(candidate: Partial<Candidate> = {}) {
		Object.assign(this, candidate);
	}
}

export const candidateConverter = {
	toFirestore: function(candidate: Candidate): firebase.firestore.DocumentData {
		const { candidateFName, id, candidateLName, candidatePlan, applyPosition,
				approved, votesFromMembers } = candidate;

		return { candidateFName, id, candidateLName, candidatePlan, applyPosition,
				 approved, votesFromMembers };
	},
	fromFirestore: function(snapshot: firebase.firestore.DocumentData): Candidate {
		const data = snapshot;

		return new Candidate(data);
	}
};