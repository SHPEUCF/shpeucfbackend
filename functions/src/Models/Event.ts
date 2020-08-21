import firebase from 'firebase-admin';

export class Event {
    rsvp = {};
    name: string = ""; 
    date: string = "";
    startTime: string = "";
    endTime: string = "";
    location:  string = "";
    points: string = "";
    committee: string = "";
    type: string = "";
    id: string = "";
    code: string = "";

    constructor(event: Partial<Event> = {}) {
        Object.assign(this, event);
        this.code = this.makeCode();
    }

    /**
     * Creates a random Code with the length inputted. The code omits characters that commonly look similar in popular fonts.
     *
     * @access     private
     * @param {Number=} length  The length of the code you want created.
     */

    makeCode(length = 4) {
        let text = "";
        let possible = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}

export const eventConverter = {
    toFirestore: function(event: Event): firebase.firestore.DocumentData {
        const { rsvp, name, date, startTime, endTime, location, points, committee, type, id, code } = event;

        return { rsvp, name, date, startTime, endTime, location, points, committee, type, id, code };
    },
    fromFirestore: function(snapshot: firebase.firestore.DocumentData): Event {
        const data = snapshot;
        return new Event(data);
    }
}
