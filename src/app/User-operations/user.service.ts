import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Observable } from 'rxjs';
import { LoginFailedComponent } from './login-failed/login-failed.component';
import { User } from './user';
import { AppComponent } from '../app.component';




@Injectable({ providedIn: 'root' })
export class SignUpService {

  constructor(public cookieService: NgxEncryptCookieService, private router: Router, public dialog: MatDialog, private http: HttpClient,) { }

  key = this.cookieService.generateKey();

  appc: AppComponent;

  headers = new Headers();

  //create user account
  createUser(user: User) {
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

  //login verified user
  loginUser(user: User): any {

    let authString = `${user.username}:${user.password}`

    this.headers.set('Authorization', 'Basic ' + btoa(authString))


    return fetch('https://apps-lapp-server.herokuapp.com/api/auth/login', {
      method: 'GET',
      headers: this.headers,
    })
      .then(response => {
        if (response.ok) {
          console.log('Success:',);
          this.cookieService.set('username', user.username, false);
          this.cookieService.set('password', user.password, false);
          this.router.navigate(['/dashboard']);
        }
        else {
          this.openDialogLoginFailed();
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }


  //tests if user is logged in
  isLoggedIn(): boolean {
    return !!this.cookieService.get('username', false);
  }

  //logout user & delete cookies
  logOut() {
    this.cookieService.deleteAll();
  }



  //get string array of users 
  getAllUsers(): Observable<string[]> {

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<string[]>('https://apps-lapp-server.herokuapp.com/api/management/getStudents', { headers: headerHttp },)

  }

  //resend email for verification
  resendEmail(username: string) {
    return fetch(`https://apps-lapp-server.herokuapp.com/api/auth/resendEmail/${username}`, {
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

  //send request for password reset
  resetPassword(username: string) {
   return fetch(`https://apps-lapp-server.herokuapp.com/api/auth/resetPassword/${username}`, {
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

  //submit new password after reset
  submitNewPassword(username: string, password: string): any {
   return fetch(`https://apps-lapp-server.herokuapp.com/api/auth/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  openDialogLoginFailed() {
    this.dialog.open(LoginFailedComponent);
  }



}

