import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/User-operations/user';
import { Exercise } from '../exercise';
import { ExerciseGroup } from '../exercise-group';
import { LabService } from '../lab.service';


@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent implements OnInit {

  constructor(private labService: LabService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.getExercise();
    // this.getExestingGroup();

    this.getExercise();
    this.getExestingGroup();
  }

  exerciseId: number;
  exercise = new Exercise('','','', 0);
  exerciseGroupModel = new ExerciseGroup('', []);

  
  student = new User('','','','','');
  selectedOption: string;
  selectedOrder = new FormControl();
  groups: any[] = [];
  options: string[] = ['Add to Existing Group', 'Create New Group'];
  id: number;

  dropDownChanged(event: MatSelectChange) {
    this.exercise.groupName = event.value;
    console.log(this.exercise.groupName);
  }
  onSubmit(){
    this.labService.updateExercise(this.id,this.exercise, this.exerciseGroupModel.minStars, this.exerciseGroupModel.maxStars);
  }
  getExercise(){
    const name = String(this.route.snapshot.paramMap.get('id'));
    this.labService.editExercise(name).subscribe(response => {
      console.log(response);
      
      this.exercise = response;
      this.id = response.id;
    });
  }
  getExestingGroup(){
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.groups = response;
      this.exerciseGroupModel.minStars = response[0].minStars;
      this.exerciseGroupModel.maxStars = response[0].maxStars;
    });
  }

  
}
