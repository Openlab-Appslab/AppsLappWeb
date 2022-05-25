export class User {
    id: number;
    firstName: any;
    lastName: any;
    username: any;
    email: any;
    password: any;
    score: number;

    constructor(
        firstName: any,
        lastName: any,
        username: any,
        password: any,
        email: any,
    ) { 
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.score = 0;
    }
}

