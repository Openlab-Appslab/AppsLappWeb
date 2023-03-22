import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://api.github.com/users/';

  

  getUserActivity(username: string){
    return this.http.get(`${this.apiUrl}${username}/events`);
  }
}
