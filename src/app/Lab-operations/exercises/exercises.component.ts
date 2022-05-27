import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseGroup } from '../exercise-group';
import { LabService } from '../lab.service';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {


  constructor(private labService: LabService) {
   
  }

  ngOnInit(): void {
    this.labService.getAllExercises().subscribe(response =>{
      this.exercisesNotIn = response;
    });

    this.getAllExercises();
    this.getExestingGroup();
    this.getAllGroups();
  }


  exercisesNotIn: Exercise[] = [];
  exercisesIn: Exercise[] = [];

  exerciseGroupModel = new ExerciseGroup('', this.exercisesIn);

  exerciseModel = new Exercise('', '', '', 0, 0);

  options: string[] = ['Add to Existing Group', 'Create New Group'];
  groups: any[] = [];
  selectedOption: string;
  allGroups: ExerciseGroup[] = [];
  allExercises: Exercise[] = [];

  onSubmit() {
    this.labService.createExercise(this.exerciseModel);
    this.exercisesNotIn.push(this.exerciseModel);
  }

  dropDownChanged(event: MatSelectChange) {
    this.exerciseModel.groupName = event.value;
  }
    selectedOrder = new FormControl();

  getExestingGroup(){
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.groups = response;
    });
  }

  getAllGroups(){
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.allGroups = response;
    }); }

  getAllExercises(){
    this.labService.getAllExercises().subscribe(response => {
      this.allExercises = response;
    })
  }
}
