import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  exerciseModel = new Exercise('','',0, 0);

  exerciseGroup: string;
  exerciseDescription: string;
  exercises: string[] = [];

  addToExercises(){
    this.exercises.push(this.exerciseModel.description);

  }

  deleteFromLab(item: string){
    this.exercises = this.exercises.filter(h => h !== item);
  }
}
