import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseGroup } from '../exercise-group';
import { LabService } from '../lab.service';
import { MatSelectChange } from '@angular/material/select';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  constructor(private labService: LabService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.labService.getAllExercises().subscribe(response => {
      this.exercisesNotIn = response;
    });

    this.getAllExercises();
    this.getExestingGroup();
    this.getAllGroups();
  }


  exercisesNotIn: Exercise[] = [];
  exercisesIn: Exercise[] = [];
  stars: any = undefined;

  exerciseGroupModel = new ExerciseGroup('', this.exercisesIn);

  exerciseModel = new Exercise('', 'popis cvicenia ide', '', this.stars);

  options: string[] = ['Pridať do existujúcej skupiny', 'Vytvoriť novú skupinu'];
  groups: any[] = [];
  selectedOption: string = 'Pridať do existujúcej skupiny';
  allGroups: ExerciseGroup[] = [];
  allExercises: Exercise[] = [];
  loading: boolean = false;

  onSubmit() {
    this.loading = true;
    if (this.selectedOption != 'Pridať do existujúcej skupiny') {
      this.exercisesNotIn.push(this.exerciseModel);
      this.labService.createExercise(this.exerciseModel, this.exerciseGroupModel.minStars, this.exerciseGroupModel.maxStars).then(() => { 
        this.loading = false;
        window.location.reload();
      });
    }
    else {
      this.labService.createExercise(this.exerciseModel, 0, 0).then(() => { 
        this.loading = false;
        this.exercisesNotIn.push(this.exerciseModel);
        window.location.reload();
      });
    }
  }

  dropDownChanged(event: MatSelectChange) {
    this.exerciseModel.groupName = event.value;
  }
  selectedOrder = new UntypedFormControl();

  getExestingGroup() {
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.groups = response;
    });
  }

  getAllGroups() {
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.allGroups = response;
    });
  }

  getAllExercises() {
    this.labService.getAllExercises().subscribe(response => {
      this.allExercises = response;
    })
  }

  deleteExercise(exercise: Exercise) {
    this.labService.deleteExercise(exercise.name);
    this.allExercises = this.allExercises.filter(h => h !== exercise);
  }

  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef);
    myTempDialog.afterClosed();
  }
}
