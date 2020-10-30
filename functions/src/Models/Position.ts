import firebase from 'firebase-admin';

export class Position {
    title: string = "";
    level: number = 0;
    description: string = "";
    candidates = {};

    constructor(position: Partial<Position> = {}) {
        Object.assign(this, position);
    }
}

export const positionConverter = {
    toFirestore: function (position: Position): firebase.firestore.DocumentData {
        const { title, level, description, candidates } = position;

        return { title, level, description, candidates };
    },

    fromFirestore: function (snapshot: firebase.firestore.DocumentData): Position {
        const data = snapshot;

        return new Position(data);
    }
};