import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { LoginFailedComponent } from './login-failed/login-failed.component';
import { User } from './user';




@Injectable({ providedIn: 'root' })
export class SignUpService {

  constructor(public cookieService: NgxEncryptCookieService, private router: Router, public dialog: MatDialog) { }

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
      this.cookieService.set('password', user.password, true, this.key, 0.02);
      this.router.navigate(['/lab-form']);
    })
    .catch((error) => {
      console.log('Error:', error);
      this.openDialogLoginFailed();
    });
  }


  getLoggedUser(user: User){
   let cookieVal = this.cookieService.get('username', user.username);
    cookieVal.toString();
  }

  

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


  resendEmail(user: User){
    var userN = `${user.username}`
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
