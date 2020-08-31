import firebase from 'firebase-admin';

export class User {
    voted: boolean = false;
    applied: boolean = false;
    userCommittees: object = {};
    privilege: object = {};
    color: string = "#21252b";
    points: number = 0;
    flag: string = "";
    picture: string = "";
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    major: string = "";
    country: string = "";
    gender: string = "";
    birthday: string = "";
    id: string = "";

    constructor(user: Partial<User> = {}) {
        Object.assign(this, user);
    }

}

export const userConverter = {
    toFirestore: function(user: User): firebase.firestore.DocumentData {
        const { voted, applied, userCommittees, privilege, color, country, picture, points, flag,
            firstName, lastName, email, major, gender, birthday, id} = user;

        return { voted, applied, userCommittees, privilege, color, country, picture, points, flag,
            firstName, lastName, email, major, gender, birthday, id };
    },
    fromFirestore: function(snapshot: firebase.firestore.DocumentData): User {
        const data = snapshot;
        return new User(data);
    }
}