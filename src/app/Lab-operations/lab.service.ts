import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Observable, of } from 'rxjs';
import { Exercise, Exerciseh, Lab } from './exercise';
import { SignUpService } from '../User-operations/user.service';
import { ExerciseGroup } from './exercise-group';
import { User } from '../User-operations/user';


@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private router: Router, private cookieService: NgxEncryptCookieService, private http: HttpClient, private userService: SignUpService) { }
  headers = new Headers();
  url = 'https://appslab-api.herokuapp.com/api/management/'; 
   

  //create lab of students
  createLab(labStudents: string[], labName: string) {
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`

    fetch( this.url + 'createLab', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(authString),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ name: labName, studentNames: labStudents }),


    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log(JSON.stringify({ name: labName, studentNames: labStudents }))
      });
  }

  // create exercise for students
  createExercise(model: Exercise, minStars: number, maxStars: number) {
    let exerciseM = new Exerciseh(model.name, model.description, model.groupName, model.requiredStars);
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`

    return fetch( this.url + 'createExercise', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(authString),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ exercise: exerciseM, minStars: minStars, maxStars: maxStars }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //update exercise after edit
  updateExercise(id: number, model: Exercise, groupName: string) {
    let exerciseM = new Exerciseh(model.name, model.description, model.groupName, model.requiredStars);
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`

    fetch( this.url + 'createExercise', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(authString),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ id: id, exercise: exerciseM, groupName: groupName }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //create array of exercises (exerciseGroup)
  createGroupOfExercises(exerciseGroupModel: ExerciseGroup) {

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`
    fetch( this.url + 'createGroupOfExercises', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(authString),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(exerciseGroupModel),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //return all created exercises
  getAllExercises(): Observable<Exercise[]> {

    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<Exercise[]>( this.url + 'getAllExercises', { headers: headerHttp })
  }

  //get all exercise groups 
  getAllExerciseGroups(): Observable<ExerciseGroup[]> {

    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });


    return this.http.get<ExerciseGroup[]>( this.url + 'getAllGroups', { headers: headerHttp })
  }

  //return all labs owned by lab master / admin
  getLabs(): Observable<Lab[]> {

    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });
    

    return this.http.get<Lab[]>(this.url + 'getLabs', { headers: headerHttp },)
    

  }

  //get lab by id
  getLab(id: number): Observable<any> {
    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<any>( this.url + `getLab/${id}`, { headers: headerHttp });


  }

  //save lab after edit
  saveLab(labId: number, exercises: string[]) {
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`
    fetch( this.url +  'addGroupToLab', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(authString),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ labId: labId, groupsOfExercises: exercises }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //get student by id
  getStudent(id: number): Observable<any> {
    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<any>( this.url + `getStudent/${id}`, { headers: headerHttp });
  }

  //update student score 
  updateScore(studentId: number, exerciseName: string, score: number, isDone: boolean) {
    console.log(score);
    
    console.log(isDone);
    
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`
    fetch( this.url +  'updateScore', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(authString),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({ studentId: studentId, exerciseName: exerciseName, score: score, isDone: isDone }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
        JSON.parse(error);
      });
  }

  //get exercise by name to edit
  editExercise(name: string): Observable<any> {
    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<any>( this.url + `getExercise/${name}`, { headers: headerHttp });
  }


  //del exercise
  deleteExercise(name: string) {
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`
    fetch( this.url +  'deleteExercise/' + name, {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(authString),
        'Content-Type': 'application/json'
      }),

    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // searchExercise(term: string): Observable<Exercise[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array
  //     return of([]);
  //   }
  //   return this.http.get<Exercise[]>( `getExercise/${term}`);
  // }
}



