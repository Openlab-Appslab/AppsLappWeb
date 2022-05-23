import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Exercise, Lab } from '../exercise';
import { ExerciseGroup } from '../exercise-group';
import { LabService } from '../lab.service';


@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {
  


  constructor(private labService: LabService,  private route: ActivatedRoute, public dialog: MatDialog) {  }

  lab: Lab;
  allExercises: Exercise[] = [];
  labExercises: Exercise[] = [];

  ngOnInit(): void {
    this.getLab();
    this.getAllExercises();
    this.getAllGroups();
  }

  getLab(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.labService.getLab(id)
      .subscribe(lab => {
        this.lab = lab;
        this.studentss = lab.studentNames;
      });
  }

  studentss: any[];
  students = [
    {position: 1, name: 'John', department: 'FE', score: 80, trophy: 3},
    {position: 2, name: 'Mary', department: 'BE', score: 90, trophy: 2},
    {position: 3, name: 'Mike', department: 'BE', score: 70, trophy: 1},
    {position: 4, name: 'Adam', department: 'FE', score: 60, trophy: 0},
    {position: 5, name: 'Peter', department: 'BE', score: 50, trophy: 10},
  ];
  
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef);
    myTempDialog.afterClosed();
  }

  getAllExercises(){
    this.labService.getAllExercises().subscribe(response => {
      this.allExercises = response;
    });
  }



  addExercise(exercise: any){
    this.labGroups.push(exercise);
    this.allGroups = this.allGroups.filter(h => h !== exercise);
  }

  allGroups: ExerciseGroup[] = [];
  labGroups: ExerciseGroup[] = [];



  getAllGroups(){
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.allGroups = response;
    }); }

    saveLab(){
      this.labService.saveLab(this.lab.name, this.labGroups);
    }
}
