import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Observable } from 'rxjs';
import { LoginFailedComponent } from './login-failed/login-failed.component';
import { User } from './user';




@Injectable({ providedIn: 'root' })
export class SignUpService {

  constructor(public cookieService: NgxEncryptCookieService, private router: Router, public dialog: MatDialog, private http: HttpClient) { }

  key = this.cookieService.generateKey();

  headers = new Headers();

  
  

  createUser(user: User){
    fetch('https://apps-lapp-server.herokuapp.com/api/auth/register', {
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

  loginUser(user: User){
    let authString = `${user.username}:${user.password}`

    this.headers.set('Authorization', 'Basic ' + btoa(authString))

    fetch('https://apps-lapp-server.herokuapp.com/api/auth/login', {
      method: 'GET',
      headers: this.headers})
    .then(response => response.json())
    .then(data => {
      this.cookieService.set('username', user.username, false);
      this.cookieService.set('password', user.password, false);
      this.router.navigate(['/lab-form']);
    })
    .catch((error) => {
      console.log('Error:', error);
      this.openDialogLoginFailed();
    });
  }

/*
  getAllUsers(){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  

    this.headers.set('Authorization', 'Basic ' + btoa(authString))

    fetch('https://apps-lapp-server.herokuapp.com/api/management/getStudents', {
      method: 'GET',
      headers: this.headers})
    .then(response => response.json())
    .then(data => {return data});
  }
*/

  getAllUsers(): Observable<string[]> {

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  

  let  headerHttp = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' + btoa(authString)
  });

    
    return this.http.get<string[]>('https://apps-lapp-server.herokuapp.com/api/management/getStudents', {headers: headerHttp} )
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
