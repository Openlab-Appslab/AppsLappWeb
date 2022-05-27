export class Exercise {
    name: string;
    description: string;
    groupName: string;
    requiredStars: number; 

    constructor(name: string, description: string, groupName: string, requiredStars: number, maxStars: number) {
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