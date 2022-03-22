import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { LabService } from '../lab.service';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  constructor(private labService: LabService) { 
    this.notInLab = this.labService.getAllExercises1();
    console.log(this.notInLab);
  }

  ngOnInit(): void {
    
  }
 

  notInLab: any;

  exerciseModel = new Exercise('','',0, 0);

  
  onSubmit(){    
    this.labService.createExercise(this.exerciseModel);
  }
}
