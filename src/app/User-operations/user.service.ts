import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Observable } from 'rxjs';
import { LoginFailedComponent } from './login-failed/login-failed.component';
import { User } from './user';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';
import { AppComponent } from '../app.component';




@Injectable({ providedIn: 'root' })
export class SignUpService {

  constructor(public cookieService: NgxEncryptCookieService, private router: Router, public dialog: MatDialog, private http: HttpClient, ) { }

  key = this.cookieService.generateKey();

  appc: AppComponent;

  headers = new Headers();  

  createUser(user: User){
    return fetch('https://apps-lapp-server.herokuapp.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Registration failed, please try again.")
    });
  }

  async loginUser(user: User){
    
    let authString = `${user.username}:${user.password}`

    this.headers.set('Authorization', 'Basic ' + btoa(authString))

    try {
      const response = await fetch('https://apps-lapp-server.herokuapp.com/api/auth/login', {
        method: 'GET',
        headers: this.headers,
      });
      const data_1 = await response.json();
      this.cookieService.set('username', user.username, false);
      this.cookieService.set('password', user.password, false);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log('Error:', error);
      this.openDialogLoginFailed();
    }
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('username', false);
  }

  logOut() {
    this.cookieService.deleteAll();
  }
/*
  loginUserHttp(user: User){
    let authString = `${user.username}:${user.password}`

  let  headerHttp = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' + btoa(authString)
  });
   return this.http.get('https://apps-lapp-server.herokuapp.com/api/auth/login', {headers: headerHttp}, )
   
  }
  */



  getAllUsers(): Observable<string[]> {

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  

  let  headerHttp = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' + btoa(authString)
  });
    
    return this.http.get<string[]>('https://apps-lapp-server.herokuapp.com/api/management/getStudents', {headers: headerHttp}, )
    
  }


  /*
 async getAllUsers(){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  

    this.headers.set('Authorization', 'Basic ' + btoa(authString))

    let aaaaaaaaaaaa = await fetch('https://apps-lapp-server.herokuapp.com/api/management/getStudents', {
      method: 'GET',
      headers: this.headers})
      return aaaaaaaaaaaa.json();
  }
*/



 async displayButton(isAdmin: boolean){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  

    this.headers.set('Authorization', 'Basic ' + btoa(authString))

    let fetchTest = await fetch('https://apps-lapp-server.herokuapp.com/api/management/getStudents', {
      method: 'GET',
      headers: this.headers})
      .then(response => isAdmin = response.ok )

    return  isAdmin;     
      
  }

/*
  deleteUser(){
    fetch('https://jsonplaceholder.typicode.com/todos/205', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }
*/

  resendEmail(user: User){
    fetch(`https://apps-lapp-server.herokuapp.com/api/auth/resendEmail/${user.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  openDialogLoginFailed() {
    this.dialog.open(LoginFailedComponent);
  }

 
}

