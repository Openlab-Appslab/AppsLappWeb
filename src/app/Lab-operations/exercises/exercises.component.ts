import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { LabService } from '../lab.service';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  constructor(private labService: LabService) { }

  ngOnInit(): void {
    
  }

  exerciseModel = new Exercise('','',0, 0);

  
  onSubmit(){    
    this.labService.createExercise(this.exerciseModel);
  }
}
