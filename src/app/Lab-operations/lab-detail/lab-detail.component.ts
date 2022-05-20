import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Exercise, Lab } from '../exercise';
import { LabService } from '../lab.service';


@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {
  


  constructor(private labService: LabService,  private route: ActivatedRoute, public dialog: MatDialog) { }

  lab: Lab;
  allExercises: Exercise[] = [];
  labExercises: Exercise[] = [];

  ngOnInit(): void {
    this.getLab();
    console.log(this.lab);
    this.getAllExercises();
    console.log(this.allExercises);
    
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
    {name: 'John', department: 'FE', score: 80},
    {name: 'Mary', department: 'BE', score: 90},
    {name: 'Mike', department: 'BE', score: 70},
    {name: 'Adam', department: 'FE', score: 60},
    {name: 'Peter', department: 'BE', score: 50},
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

  addExercise(exercise: Exercise){
    this.labExercises.push(exercise);
    this.allExercises = this.allExercises.filter(h => h !== exercise);
  }
}
