export class Exercise {
    name: string;
    description: string;
    groupName: string;
    requiredStars: number; 
    isDone: boolean = false;

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
    

    constructor(name: string, description: string, groupName: string, requiredStars: number) {
        this.name = name;
        this.description = description;
        this.groupName = groupName;
        this.requiredStars = requiredStars;
    }
        
}

export class Lab {
    id: number;
    name: string;
    labMaster: string;
    studentNames: string[];
    
}