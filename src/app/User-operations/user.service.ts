import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Observable } from 'rxjs';
import { LoginFailedComponent } from './login-failed/login-failed.component';
import { User } from './user';
import { AppComponent } from '../app.component';
import * as CryptoJS from 'crypto-js';


@Injectable({ providedIn: 'root' })
export class SignUpService { 

  constructor(public cookieService: NgxEncryptCookieService, private router: Router, public dialog: MatDialog, private http: HttpClient,) { }

  appc: AppComponent;

  headers = new Headers();
  url = 'https://appslab-api.herokuapp.com/api';

  //generate crypto key
  key = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  

  //create user account
  createUser(user: User) {
    return fetch(this.url + '/auth/' + 'register', {
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


    return fetch(this.url + '/auth/' + 'login', {
      method: 'GET',
      headers: this.headers,
    })
      .then(response => {
        if (response.ok) {
          console.log('Success:',);
          let authStringEncrypted = CryptoJS.AES.encrypt(authString, this.key).toString();
          localStorage.setItem('key', this.key);
          localStorage.setItem('authString', authStringEncrypted);
          localStorage.setItem('username', user.username);
          // this.router.navigate(['/dashboard']);
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
    return !!localStorage.getItem('authString');
  }

  //logout user & delete cookies
  logOut() {
    localStorage.removeItem('authString');
  }



  //get string array of users 
  getAllUsers(): Observable<string[]> {

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<string[]>(this.url + '/student/', { headers: headerHttp },)

  }

  //resend email for verification
  resendEmail(username: string) {
    return fetch(this.url + '/auth/' + `resendEmail/${username}`, {
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
   return fetch(this.url +'/auth/' + `resetPassword/${username}`, {
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
   return fetch(this.url + '/auth/' + `resetPassword`, {
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

