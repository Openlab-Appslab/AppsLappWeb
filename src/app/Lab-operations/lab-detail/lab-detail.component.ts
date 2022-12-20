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
  labId: number;
  allExercises: Exercise[] = [];
  labExercises: Exercise[] = [];
  isStudent: boolean = false;
  sortedStudents: any[];
  event: string = '';

  ngOnInit(): void {
    this.getLab();
    this.getAllExercises();
    this.getAllGroups();
    // this.dataSource.data = this.dataSource.data.sort((a, b) => a.score < b.score ? -1 : a.score > b.score ? 1 : 0);
      
    
  }

  getLab(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.labId = id;
    this.labService.getLab(id)
      .subscribe(lab => {
        this.labGroups = lab.groupOfExercises;
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
    { name: 'Group 1', exercises: [], maxStars: 0, minStars: 0, award: '', deadline: new Date('2021-01-01') ,}, 
  ];
  labGroupsNames: string[] = [];



  getAllGroups(){
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.allGroups = response;
    }); }

    saveLab(){
      this.labService.saveLab(this.labId, this.labGroupsNames);
      this.editExerciseTester = false;
      this.editGroupTester = false;
    }

    editGroupTester: boolean = false;
    editExerciseTester: boolean = false;

    editGroup(){
      this.editGroupTester = true;
    }
    editExercise(){
      this.editExerciseTester = true
    }

    // sortStudents(){
    //  // this.dataSource.data.sort((a, b) => a.score < b.score ? -1 : a.score > b.score ? 1 : 0);
    //   return this.dataSource.data.sort((a, b) => a.name.localeCompare(b.name));
    // }

}
