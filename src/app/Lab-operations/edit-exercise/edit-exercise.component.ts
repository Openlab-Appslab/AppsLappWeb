import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/User-operations/user';
import { Exercise } from '../exercise';
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
    this.setTest();
  }

  exerciseId: number;
  exercise = new Exercise('','','', 0, 0);
  exerciseTest: Exercise = new Exercise('','','', 0, 0);

  
  student = new User('','','','','');
  selectedOption: string;
  selectedOrder = new FormControl();
  groups: any[] = [];
  options: string[] = ['Add to Existing Group', 'Create New Group'];

  dropDownChanged(event: MatSelectChange) {
    this.exerciseTest.groupName = event.value;
  }
  onSubmit(){
    this.labService.saveExercise(this.exerciseTest);
  }
  getExercise(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.exerciseId = id;
    this.labService.editExercise(id).subscribe(response => {
      console.log(response);

    });
  }
  getExestingGroup(){
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.groups = response;
    });
  }

  setTest(){
    this.exerciseTest.name = 'GitHub';
    this.exerciseTest.groupName = 'StarterPack';
    this.exerciseTest.description = 'pridaj repo na github';
    this.exerciseTest.minStars = 4;
    this.exerciseTest.maxStars = 10;
  }
}
