export class User {
    voted: boolean = false;
    applied: boolean = false;
    userCommittees: object = {};
    privilege: object = {};
    color: string = "#21252b";
    points: number = 0;
    flag: string = "";
    picture: string = "";
    firstName: string;
    lastName: string;
    email: string;
    major: string;
    country: string;
    gender: string;
    birthday: string;
    id: string;

    constructor({ firstName, lastName, email, major, country, gender, birthday, id}: any) {
        this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.major = major;
		this.country = country;
		this.gender = gender;
		this.birthday = birthday;
		this.id = id;
    }

}

// exports.User = User;