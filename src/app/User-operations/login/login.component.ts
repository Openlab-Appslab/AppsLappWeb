import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { SignUpService } from '../user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
 public model: User;

 public loading: boolean = false;
  

  constructor(private userService: SignUpService) { 
    this.model = new User('', '', '','','');
  }

  ngOnInit(): void {
    
  }

  resendEmail(){
    this.userService.resendEmail(this.model.username);
  }
  


  onSubmit(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 4000);
    this.userService.loginUser(this.model)
  }

}
