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

 loading: boolean;
  

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
    
    this.userService.loginUser(this.model).then(() => { this.loading = false });
  }

}
