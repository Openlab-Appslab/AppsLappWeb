import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Exercise } from './exercise';


@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private router: Router, private cookieService: NgxEncryptCookieService) { }

  headers = new Headers();

  createLab(lab: string[] , labName: string){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  

    this.headers.set('Authorization', 'Basic ' + btoa(authString))

    fetch('https://apps-lapp-server.herokuapp.com/', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({a: lab, b: labName}),
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
      fetch('https://apps-lapp-server.herokuapp.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Registration failed, please try again.")
      });
  }
}
