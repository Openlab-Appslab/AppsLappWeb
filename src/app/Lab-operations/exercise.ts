export class Exercise {
    name: string;
    description: string;
    groupName: string;
    requiredStars: number; 
    done: boolean = false;
    hint: string;

    constructor(name: string, description: string, groupName: string, requiredStars: number) {
        this.name = name;
        this.description = description;
        this.groupName = groupName;
        this.requiredStars = requiredStars;
    }
        
}

export class Exerciseh {
    name: string;
    description: string;
    groupName: string;
    requiredStars: number; 
    hint: string;
    

    constructor(name: string, description: string, groupName: string, requiredStars: number, hint: string) {
        this.name = name;
        this.description = description;
        this.groupName = groupName;
        this.requiredStars = requiredStars;
        this.hint = hint;
    }
        
}

export class Lab {
    id: number;
    name: string;
    labMaster: string;
    studentNames: string[];
    
}