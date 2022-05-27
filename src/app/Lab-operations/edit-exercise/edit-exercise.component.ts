import { Component, OnInit } from '@angular/core';
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

  }

  exerciseId: number;
  exercise = new Exercise('','','', 0, 0);
  student = new User('','','','','');

  getExercise(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.exerciseId = id;
    this.labService.editExercise(id).subscribe(response => {
      console.log(response);
      this.exercise = response;
    });
  }
}
