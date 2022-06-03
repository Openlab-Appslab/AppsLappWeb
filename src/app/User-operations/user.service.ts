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

  loginUser(user: User) {

    let authString = `${user.username}:${user.password}`

    this.headers.set('Authorization', 'Basic ' + btoa(authString))


    return fetch('https://apps-lapp-server.herokuapp.com/api/auth/login', {
      method: 'GET',
      headers: this.headers,
    })
      .then(response => {
        if(response.ok){
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



  isLoggedIn(): boolean {
    return !!this.cookieService.get('username', false);
  }

  logOut() {
    this.cookieService.deleteAll();
  }




  getAllUsers(): Observable<string[]> {

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`

    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });

    return this.http.get<string[]>('https://apps-lapp-server.herokuapp.com/api/management/getStudents', { headers: headerHttp },)

  }


  resendEmail(user: User) {
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

