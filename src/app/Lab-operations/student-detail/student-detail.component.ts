import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GithubService } from 'src/app/User-operations/github.service';
import { User } from 'src/app/User-operations/user';
import { Exercise } from '../exercise';
import { LabService } from '../lab.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  constructor(private labService: LabService, private route: ActivatedRoute, private gitService: GithubService) { }

  ngOnInit(): void {
    this.getStudent();
      
  }


  student = new User('', '', '', '', '', );
  studentId: number;
  exercises: Exercise[];
  isDone: boolean;
  activity: any;


  getStudent(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentId = id;
    this.labService.getStudent(id).subscribe(response => {
      this.student.username = response.name;
      this.student.score = response.score;
      this.exercises = response.exercises; 
      this.getGithubActivity(response.gitName);   
    });
  }

  updateScore(exercise: Exercise){
    exercise.done = true;
    this.student.score = this.student.score + exercise.requiredStars;
    
    this.labService.updateScore(this.studentId, exercise.name, exercise.requiredStars, true); 
  }

  getGithubActivity(username: string){
    this.gitService.getUserActivity(username).subscribe(response => {
      this.activity = response;
      console.log(this.activity);
      
    });
  }
}
