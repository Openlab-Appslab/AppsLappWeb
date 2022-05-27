import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Observable, of } from 'rxjs';
import { Exercise, Lab } from './exercise';
import { SignUpService } from '../User-operations/user.service';
import { ExerciseGroup } from './exercise-group';
import { User } from '../User-operations/user';


@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private router: Router, private cookieService: NgxEncryptCookieService, private http: HttpClient, private userService: SignUpService) { }
  headers = new Headers();  

  createLab(labStudents: string[], labName: string){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  

    
    fetch('https://apps-lapp-server.herokuapp.com/api/management/createLab', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(authString), 
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: labName, studentNames: labStudents}),
      
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

  createExercise(model: Exercise){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  
    

      fetch('https://apps-lapp-server.herokuapp.com/api/management/createExercise', {
        method: 'POST',
        headers: new Headers({
        'Authorization': 'Basic '+btoa(authString), 
        'Content-Type': 'application/json'
      }),
        body: JSON.stringify(model),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  createGroupOfExercises(exerciseGroupModel: ExerciseGroup){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  
      fetch('https://apps-lapp-server.herokuapp.com/api/management/createGroupOfExercises', {
        method: 'POST',
        headers: new Headers({
        'Authorization': 'Basic '+btoa(authString), 
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

  let  headerHttp = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' + btoa(authString)
  });
  
    return this.http.get<Exercise[]>('https://apps-lapp-server.herokuapp.com/api/management/getAllExercises', {headers: headerHttp})
  }

  getAllExerciseGroups(): Observable<ExerciseGroup[]> {

    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`  

  let  headerHttp = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' + btoa(authString)
  });
  
  
    return this.http.get<ExerciseGroup[]>('https://apps-lapp-server.herokuapp.com/api/management/getAllGroups', {headers: headerHttp})
  }
  getLabs(): Observable<Lab[]> {
      
      let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`  
  
    let  headerHttp = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + btoa(authString)
    });
    
      return this.http.get<Lab[]>('https://apps-lapp-server.herokuapp.com/api/management/getLabs', {headers: headerHttp})   
      
    }

    getLab(id: number): Observable<any> {
      let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`  
  
    let  headerHttp = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + btoa(authString)
    });

      return this.http.get<any>(`https://apps-lapp-server.herokuapp.com/api/management/getLab/${id}`, {headers: headerHttp});
      
      
    }

    saveLab(labId: number, exercises: string[]){      
      let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  
      fetch('https://apps-lapp-server.herokuapp.com/api/management/addGroupToLab', {
        method: 'POST',
        headers: new Headers({
        'Authorization': 'Basic '+btoa(authString), 
        'Content-Type': 'application/json'
      }),
        body: JSON.stringify({labId: labId, groupsOfExercises: exercises}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    getStudent(id: number): Observable<User> {
      let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`  
  
    let  headerHttp = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + btoa(authString)
    });

      return this.http.get<User>(`https://apps-lapp-server.herokuapp.com/api/management/getStudent/${id}`, {headers: headerHttp});
    }

    updateScore(studentId: number, exerciseName: string, score: number, isDone: boolean){
      let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  
      fetch('https://apps-lapp-server.herokuapp.com/api/management/updateScore', {
        method: 'POST',
        headers: new Headers({
        'Authorization': 'Basic '+btoa(authString), 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
        body: JSON.stringify({studentId: studentId, exerciseName: exerciseName, score: score, isDone: isDone}),
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


    async displayButton(isAdmin: boolean){

      let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  
  
      this.headers.set('Authorization', 'Basic ' + btoa(authString))
  
      let fetchTest = await fetch('https://apps-lapp-server.herokuapp.com/api/management/getStudents', {
        method: 'GET',
        headers: this.headers})
        .then(response => isAdmin = response.ok )
  
      return  isAdmin;     
        
    }

    editExercise(id: number): Observable<any> {
      let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`  
  
    let  headerHttp = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + btoa(authString)
    });

      return this.http.get<any>(`https://apps-lapp-server.herokuapp.com/api/management/editExercise/${id}`, {headers: headerHttp});
    }

    saveExercise(exercise: Exercise){
      let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  
      fetch('https://apps-lapp-server.herokuapp.com/api/management/saveEditedExercise', {
        method: 'POST',
        headers: new Headers({
        'Authorization': 'Basic '+btoa(authString), 
        'Content-Type': 'application/json'
      }),
        body: JSON.stringify(exercise),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    // deleteExercise(id: number){
    //   let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  
    //   fetch('https://apps-lapp-server.herokuapp.com/api/management/saveEditedExercise', {
    //     method: 'DELETE',
    //     headers: new Headers({
    //     'Authorization': 'Basic '+btoa(authString), 
    //     'Content-Type': 'application/json'
    //   }),
    //     body: JSON.stringify(exercise),
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    // }

}



