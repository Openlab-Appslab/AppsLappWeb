import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://api.github.com/users/';

  

  getUserActivity(username: string){
    // Calculate the timestamp for 3 weeks ago
    const threeWeeksAgo = new Date(Date.now() - (21 * 24 * 60 * 60 * 1000)).toISOString();
  
    // Extract the date part of the timestamp
    const datePart = threeWeeksAgo.slice(0, 10);
  
    // Add the time and timezone part of the timestamp
    const since = `${datePart}T00:00:00Z`;
  
    // Add the since parameter to the API request
    const url = `${this.apiUrl}${username}/events?since=${since}`;
  
    return this.http.get(url);
  }
  

}
