import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseGroup } from '../exercise-group';
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
      this.exercisesNotIn = response;
    });
  }


  exercisesNotIn: Exercise[] = [];
  exercisesIn: Exercise[] = [];

  exerciseGroupModel = new ExerciseGroup('', this.exercisesIn);

  exerciseModel = new Exercise('', '', 0, 0);

  onSubmit() {
    this.labService.createExercise(this.exerciseModel);
    this.exercisesNotIn.push(this.exerciseModel);
  }

  onSubmitGroup(){
    this.labService.createGroupOfExercises(this.exerciseGroupModel);    
  }

  addToGroup(item: Exercise){
    this.exercisesIn.push(item);
    this.exercisesNotIn = this.exercisesNotIn.filter(h => h !== item);
  }
  
  deleteFromGroup(item: Exercise){
    this.exercisesIn = this.exercisesIn.filter(h => h !== item);
    this.exercisesNotIn.push(item);
  }
}
