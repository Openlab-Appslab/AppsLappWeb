import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/User-operations/user';
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
        this.dataSource.data = lab.studentNames;
      });
  }


  studentss: any[];
  
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns = ['Name', 'Score', 'Trophies', 'Edit'];

  
  
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



  addExercise(exercise: ExerciseGroup){
    this.labGroups.push(exercise);
    this.labGroupsNames.push(exercise.name);
    this.allGroups = this.allGroups.filter(h => h !== exercise);
  }

  allGroups: ExerciseGroup[] = [];
  labGroups: ExerciseGroup[] = [
    { name: 'Group 1', exercises: [] },
  ];
  labGroupsNames: string[] = [];



  getAllGroups(){
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.allGroups = response;
    }); }

    saveLab(){
      this.labService.saveLab(this.lab.id, this.labGroupsNames);
    }
}
