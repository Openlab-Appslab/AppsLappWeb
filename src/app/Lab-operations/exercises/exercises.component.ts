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
   
  }

  ngOnInit(): void {
    //this.labService.getAllExercises().subscribe(response => this.notInLab = response);
    this.labService.getAllExercises().subscribe(response =>{
      this.exercises = response;
    });
  }


  exercises: Exercise[];



  exerciseModel = new Exercise('', '', 0, 0);


  onSubmit() {
    this.labService.createExercise(this.exerciseModel);
  }
}
