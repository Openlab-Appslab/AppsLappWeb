import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { catchError, map, Observable, tap } from 'rxjs';
import { LoginFailedComponent } from './login-failed/login-failed.component';
import { User } from './user';
import { AppComponent } from '../app.component';
import * as CryptoJS from 'crypto-js';
import { LabService } from '../Lab-operations/lab.service';


@Injectable({ providedIn: 'root' })
export class SignUpService { 

  constructor(public cookieService: NgxEncryptCookieService, private router: Router, public dialog: MatDialog, private http: HttpClient) { }

  appc: AppComponent;

  headers = new Headers();
  url = 'https://appslab-api.herokuapp.com/api';

  //generate crypto key
  key = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  

  getAuthString() {
    // get the authString from local storage or cookie
    const authString = localStorage.getItem('authString');
    const key = localStorage.getItem('key');
    // decrypt the authString
    const bytes = CryptoJS.AES.decrypt(authString as string, key as string);
    const decryptedAuth = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedAuth;
  }

  //create user account
  createUser(user: User, gitName: string) {
    return fetch(this.url + '/auth/' + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({username: user.username, password: user.password, email: user.email, gitName: gitName}),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // this.router.navigate(['/login']);
        console.log({username: user.username, password: user.password, email: user.email, gitName: gitName});
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Registration failed, please try again.")
        console.log({username: user.username, password: user.password, email: user.email, gitName: gitName});
        
      });
  }

  //login verified user with http
  loginUserHttp(user: User): Observable<any> {

    let authString = `${user.username}:${user.password}`
    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });
    //return and than set authString in local storage
    return this.http.get(this.url + '/auth/' + 'login', { headers: headerHttp }).pipe(
      tap((response:any) => {
          console.log('Success:',);
          let authStringEncrypted = CryptoJS.AES.encrypt(authString, this.key).toString();
          localStorage.setItem('key', this.key);
          localStorage.setItem('authString', authStringEncrypted);
          localStorage.setItem('username', user.username);
          localStorage.setItem('authority', response[0].authority);
          this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        console.log(error);
        this.openDialogLoginFailed();
        return error;
    }),
  );
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


    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.getAuthString())
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

