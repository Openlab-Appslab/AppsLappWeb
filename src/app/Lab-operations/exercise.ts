export class Exercise {
    name: string;
    description: string;
    maxStars: number;
    minStars: number;

    constructor(
        name: string,
        description: string,
        maxStars: number,
        minStars: number,
        ) { }
}

export class Lab {
    labMaster: string;
    studentNames: string[];
    name: string;
}