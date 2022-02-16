import { Component, OnInit } from '@angular/core';
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
    this.model = new User('', '', '','','');
  }

  ngOnInit(): void {
    
  }

  resendEmail(){
    this.userService.resendEmail(this.model.username);
    console.log('nwm');
  }
  

  onSubmit(){
    this.userService.loginUser(this.model);
  }

}
