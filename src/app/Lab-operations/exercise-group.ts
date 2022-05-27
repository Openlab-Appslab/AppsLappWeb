import { Exercise } from "./exercise";


export class ExerciseGroup {
    name: string;
    exercises: Exercise[];
    maxStars: number;
    minStars: number;

    constructor(name: string, exercises: Exercise[], maxStars: number, minStars: number) { 
        this.name = name;
        this.exercises = exercises;
    }
}
