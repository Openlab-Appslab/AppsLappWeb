import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Exercise } from './exercise';


@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private router: Router, private cookieService: NgxEncryptCookieService) { }


  createLab(labStudents: string, labName: string){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  

    console.log(JSON.stringify({studentNames: labStudents, name: labName}));
    

    fetch('https://apps-lapp-server.herokuapp.com/api/management/createLab', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(authString), 
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({studentNames: labStudents, name: labName}),
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
}
