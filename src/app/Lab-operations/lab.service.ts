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
  exerciseUrl = 'https://apps-lapp-server.herokuapp.com/api/management/getExercise';

  createLab(labStudents: string[], labName: string) {

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`


    fetch('https://apps-lapp-server.herokuapp.com/api/management/createLab', {
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
      });
  }

  createExercise(model: Exercise, minStars: number, maxStars: number) {
    let exerciseM = new Exerciseh(model.name, model.description, model.groupName, model.requiredStars);
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`

    return fetch('https://apps-lapp-server.herokuapp.com/api/management/createExercise', {
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

  updateExercise(id: number, model: Exercise, groupName: string) {
    let exerciseM = new Exerciseh(model.name, model.description, model.groupName, model.requiredStars);
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`

    fetch('https://apps-lapp-server.herokuapp.com/api/management/createExercise', {
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

  createGroupOfExercises(exerciseGroupModel: ExerciseGroup) {

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`
    fetch('https://apps-lapp-server.herokuapp.com/api/management/createGroupOfExercises', {
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


  getAllExercises(): Observable<Exercise[]> {

    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<Exercise[]>('https://apps-lapp-server.herokuapp.com/api/management/getAllExercises', { headers: headerHttp })
  }

  getAllExerciseGroups(): Observable<ExerciseGroup[]> {

    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });


    return this.http.get<ExerciseGroup[]>('https://apps-lapp-server.herokuapp.com/api/management/getAllGroups', { headers: headerHttp })
  }
  getLabs(): Observable<Lab[]> {

    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });
    

    return this.http.get<Lab[]>('https://apps-lapp-server.herokuapp.com/api/management/getLabs', { headers: headerHttp },)
    

  }

  getLab(id: number): Observable<any> {
    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<any>(`https://apps-lapp-server.herokuapp.com/api/management/getLab/${id}`, { headers: headerHttp });


  }

  saveLab(labId: number, exercises: string[]) {
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`
    fetch('https://apps-lapp-server.herokuapp.com/api/management/addGroupToLab', {
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

  getStudent(id: number): Observable<any> {
    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<any>(`https://apps-lapp-server.herokuapp.com/api/management/getStudent/${id}`, { headers: headerHttp });
  }

  updateScore(studentId: number, exerciseName: string, score: number, isDone: boolean) {
    console.log(score);
    
    console.log(isDone);
    
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`
    fetch('https://apps-lapp-server.herokuapp.com/api/management/updateScore', {
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


  editExercise(name: string): Observable<any> {
    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<any>(`https://apps-lapp-server.herokuapp.com/api/management/getExercise/${name}`, { headers: headerHttp });
  }



  deleteExercise(name: string) {
    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`
    fetch('https://apps-lapp-server.herokuapp.com/api/management/deleteExercise/' + name, {
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

  searchExercise(term: string): Observable<Exercise[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array
      return of([]);
    }
    return this.http.get<Exercise[]>(`https://apps-lapp-server.herokuapp.com/api/management/getExercise/${term}`);
  }
}



