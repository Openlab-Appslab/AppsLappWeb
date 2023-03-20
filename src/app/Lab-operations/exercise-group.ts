import { Exercise } from "./exercise";


export class ExerciseGroup {
    name: string;
    exercises: Exercise[];
    maxStars: number;
    minStars: number;
    award: string;
    deadline: Date;
    enabled: boolean;

    constructor(name: string, exercises: Exercise[]) { 
        this.name = name;
        this.exercises = exercises;
    }
}
