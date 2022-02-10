import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { User } from './user';



@Injectable({ providedIn: 'root' })
export class SignUpService {

  constructor(private cookieService: NgxEncryptCookieService, private router: Router) { }

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
      this.cookieService.set('username', user.username, true, this.key, 0.02);
      this.cookieService.set('password', user.password, true, this.key, 0.02);
      this.router.navigate(['/dashboard']);
    })
    .catch((error) => {
      console.log('Error:', error);
      alert("Login failed, please be sure your email is verified.")
    });
  }

  getUser(){
    fetch('https://jsonplaceholder.typicode.com/todos/205', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        
      }
    })
    .then(response => response.json())
    .then(data => console.log(data));
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


  sendCode(param: Params){
    fetch('https://apps-lapp-server.herokuapp.com/api/verify?code='+ param, {
      method: 'GET',
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
}
