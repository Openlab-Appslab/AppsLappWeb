export class Exercise {
    name: string;
    description: string;
    group: string;
    maxStars: number;
    minStars: number;

    constructor(
        name: string,
        description: string,
        group: string,
        maxStars: number,
        minStars: number,
        ) { }
}

export class Lab {
    name: string;
    labMaster: string;
    studentNames: string[];
}