import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/User-operations/user';
import { Exercise } from '../exercise';
import { LabService } from '../lab.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  constructor(private labService: LabService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStudent();
    this.getAllExercises();
  }


  student = new User('', '', '', '', '', );
  exercises: Exercise[]

  getStudent(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.labService.getStudent(id).subscribe(response => {
      this.student = response;
    });
  }

  getAllExercises(){
    this.labService.getAllExercises().subscribe(response => {
      this.exercises = response;});
  }
  n: number;

  updateScore(exercise: Exercise, ){
    this.labService.updateScore(this.student.id, exercise.name, this.n );
    
    
    
  }
  
}