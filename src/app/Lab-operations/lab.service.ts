import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { map, Observable, of } from 'rxjs';
import { Exercise, Exerciseh, Lab } from './exercise';
import { SignUpService } from '../User-operations/user.service';
import { ExerciseGroup } from './exercise-group';
import * as CryptoJS from 'crypto-js';



@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private router: Router, private cookieService: NgxEncryptCookieService, private http: HttpClient, private userService: SignUpService) { }
  headers = new Headers();
  url = 'https://appslab-api.herokuapp.com/api/'; 
 


  getAuthString() {
    // get the authString from local storage or cookie
    const authString = localStorage.getItem('authString');
    const key = localStorage.getItem('key');
    // decrypt the authString
    const bytes = CryptoJS.AES.decrypt(authString as string, key as string);
    const decryptedAuth = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedAuth;
  }


  //create lab of students
  createLab(labStudents: string[], labName: string, description: string) {

    fetch( this.url + 'lab/', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(this.getAuthString()),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ name: labName, studentNames: labStudents, description: description }),


    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        //get current lab from localstorage and route to it
        let labId;
        labId = localStorage.getItem('currentLabId');
        this.router.navigate(['/lab-detail', labId]);
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log(JSON.stringify({ name: labName, studentNames: labStudents }))
      });
  }

  // create exercise for students
  createExercise(model: Exercise, minStars: number, maxStars: number, award: string, deadline: Date) {
    let exerciseM = new Exerciseh(model.name, model.description, model.groupName, model.requiredStars, model.hint);
    console.log(JSON.stringify({ exercise: exerciseM, minStars: minStars, maxStars: maxStars, deadline: deadline }));
    
    return fetch( this.url + 'exercise/', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(this.getAuthString()),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ exercise: exerciseM, minStars: minStars, maxStars: maxStars, award: award, deadline: deadline }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        console.log(JSON.stringify({ exercise: exerciseM, minStars: minStars, maxStars: maxStars, deadline: deadline }));
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //update exercise after edit
  updateExercise(id: number, model: Exercise, groupName: string) {
    let exerciseM = new Exerciseh(model.name, model.description, model.groupName, model.requiredStars, model.hint);

    fetch( this.url + 'exercise/', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(this.getAuthString()),
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

    fetch( this.url + 'lab/createGroupOfExercises/', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(this.getAuthString()),
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

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.getAuthString())
    });

    return this.http.get<Exercise[]>( this.url + 'exercise/', { headers: headerHttp })
  }

  //get all exercise groups 
  getAllExerciseGroups(): Observable<ExerciseGroup[]> {

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.getAuthString())
    });


    return this.http.get<ExerciseGroup[]>( this.url + 'lab/getAllGroups', { headers: headerHttp })
  }

  //return all labs owned by lab master / admin
  getLabs(role: string): Observable<Lab[]> {
    
    
    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.getAuthString())
    });
    
    
    return this.http.get<Lab[]>(this.url + `lab/${role}`, { headers: headerHttp },)
    

  }

  //get lab by id
  getLab(id: number): Observable<any> {

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.getAuthString())
    });

    return this.http.get<any>( this.url + `lab/${id}`, { headers: headerHttp });
  }

  //save lab after edit
  saveLab(labId: number, exercises: string[]) {

    fetch( this.url + `lab/${labId}/addGroup`, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(this.getAuthString()),
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

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.getAuthString())
    });
    
    return this.http.get<any>( this.url + `student/${id}`, { headers: headerHttp });
  }

  //update student score 
  updateScore(studentId: number, exerciseName: string, score: number, isDone: boolean) {
    console.log(score);
    
    console.log(isDone);
    
    fetch( this.url +  'exercise/updateScore', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(this.getAuthString()),
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

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.getAuthString())
    });

    return this.http.get<any>( this.url + `exercise/${name}`, { headers: headerHttp });
  }


  //del exercise
  deleteExercise(name: string) {

    fetch( this.url +  'exercise/' + name, {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(this.getAuthString()),
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

  //get hint
  getExerciseHint(userName: any, exerciseId: number){
    
    return fetch( this.url + `exercise/getHint/${exerciseId}`, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(this.getAuthString()),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ userName: userName }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        return data;
      })
  }

  // searchExercise(term: string): Observable<Exercise[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array
  //     return of([]);
  //   }
  //   return this.http.get<Exercise[]>( `getExercise/${term}`);
  // }


}



