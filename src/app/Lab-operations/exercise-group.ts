import { Exercise } from "./exercise";


export class ExerciseGroup {
    name: string;
    exercises: Exercise[];

    constructor(
        name: string,
        exercises: Exercise[],
        ) { }
}
