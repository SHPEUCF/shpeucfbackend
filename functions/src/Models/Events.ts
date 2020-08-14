export class Events {
    rsvp = {};
    name: string; 
    date: string;
    startTime: string;
    endTime: string;
    location:  string;
    points: string;
    committee: string;
    type: any;
    id: string;
    code: string;
    constructor({ name, date, startTime, endTime, location, points, committee, type, id }: any) {
        this.name = name;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.points = points;
        this.committee = committee;
        this.type = type;
        this.id = id;
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