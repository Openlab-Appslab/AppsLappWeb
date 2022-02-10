import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../user';
import { SignUpService } from '../user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  model: User;

  constructor(private userService: SignUpService) { 
    this.model = new User('', '', '');
  }

  ngOnInit(): void {
    
  }

  

  onSubmit(){
    this.userService.loginUser(this.model);
  }

}
