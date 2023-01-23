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
  }


  student = new User('', '', '', '', '', );
  studentId: number;
  exercises: Exercise[];
  isDone: boolean;


  getStudent(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentId = id;
    this.labService.getStudent(id).subscribe(response => {
      this.student.username = response.name;
      this.student.score = response.score;
      this.exercises = response.exercises; 
      console.log(response);
      
      console.log(response.exercises);
      
    });
  }

  


  updateScore(exercise: Exercise){
    exercise.done = true;
    this.student.score = this.student.score + exercise.requiredStars;
    
    this.labService.updateScore(this.studentId, exercise.name, exercise.requiredStars, true); 

  }
  
}
