import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  


  constructor(private labService: LabService,  private route: ActivatedRoute, public dialog: MatDialog) { 
   
   }

  backgroundColors: string[];

  lab: Lab;
  labId: number;
  allExercises: Exercise[] = [];
  labExercises: Exercise[] = [];
  isStudent: boolean = false;
  sortedStudents: any[];

  date: Date = new Date();  
  hint: string = 'Text sa dá zmeniť v súbore app.component.ts';

  ngOnInit(): void {    
    this.getLab();
    this.getAllExercises();
    this.getAllGroups();
    if(localStorage.getItem('authority') == 'PUPIL'){
      this.isStudent = true;
    }
    else {
      this.isStudent = false;
    }
    // this.dataSource.data = this.dataSource.data.sort((a, b) => a.score < b.score ? -1 : a.score > b.score ? 1 : 0);
  }

  getLab(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.labId = id;
    this.labService.getLab(id)
      .subscribe(lab => {
        this.labGroups = lab.groupOfExercises;
        //create mock labGroup
        // this.labGroups.push({ name: 'Group 1', exercises: [], maxStars: 20, minStars: 30, award: 'junior', deadline: new Date('2021-01-01'), enabled: false}, )
        console.log(this.labGroups, 'labGroups');
        
        this.lab = lab;
        console.log(this.lab, 'lab');
        
        //for loop through students and run this.labService.getStudent(id) to get their trophies
        for (let i = 0; i < lab.studentNames.length; i++) {
          this.labService.getStudent(lab.studentNames[i].id).subscribe(response => {
            this.dataSource.data[i].trophies = response.awards;
            this.dataSource.data[i].score = response.score;
          });
        }
        this.dataSource.data = lab.studentNames;
      });
  }


  studentss: any[];

  
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns = ['Name', 'Score', 'Trophies', 'Edit'];

  
  
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  @ViewChild('confirmDialog')
  confirmDialog!: TemplateRef<any>;

  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef);
    myTempDialog.afterClosed();
  }

  currentExercise: any;
  openConfirmDialog(exercise: any) {
    const myTempDialog = this.dialog.open(this.confirmDialog);
    this.currentExercise = exercise;
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
    
  ];
  labGroupsNames: string[] = [];

  deadlines: (number | null)[] = [];
  datef: Date = new Date();
  
  getAllGroups() {
    this.labService.getAllExerciseGroups().subscribe(response => {
      this.allGroups = response;
      //calculate time difference and convert to days
      for (let i = 0; i < response.length; i++) {
        let dateString = response[i].deadline;
        if (!dateString) {
          this.deadlines.push(null);
          continue;
        }
        this.datef = new Date(dateString);
        const timeDiff = Math.round((this.datef.getTime() - new Date().getTime()) / 86400000);
        if (timeDiff > 0) {
          this.deadlines.push(timeDiff);
        } else {
          this.deadlines.push(null);
        }
      }
    });
  }
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

    exerciseHint(){
      //open dialog and after clicking on yes button log hint
      let username = localStorage.getItem('username');
      // this.currentExercise.hint = this.hint;
      // this.currentExercise.requiredStars = this.currentExercise.requiredStars - 3;
      // send user id and exercise name to backend and get hint from exercise and display it
      // let userId = 1;
      this.labService.getExerciseHint(username, this.currentExercise.id).then(response => response)
      .then(data => {
        this.currentExercise.hint = data.hint;
        this.currentExercise.requiredStars = this.currentExercise.requiredStars - 3;
      })
      
    }

    getBackgroundColor(group: ExerciseGroup) {
      let dateString = group.deadline;
      let datef = new Date(dateString);
      
      if (Math.round((datef.getTime() - this.date.getTime())/86400000) < 2) {
        return 'red'; // set the color to red if the group is closed
      } else if (Math.round((datef.getTime() - this.date.getTime())/86400000) < 15) {
        return '#FFA500'; // set the color to white if the group is open
      }
      else {
        return '#32CD32';
      }
    }
    

    // sortStudents(){
    //  // this.dataSource.data.sort((a, b) => a.score < b.score ? -1 : a.score > b.score ? 1 : 0);
    //   return this.dataSource.data.sort((a, b) => a.name.localeCompare(b.name));
    // }

}
