import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { SignUpService } from '../user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  constructor(private userService: SignUpService) { }

  ngOnInit(): void {
  }

  comfirmPassword: any;

  model = new User('', '', '');

  signUp(): void {
    this.userService.createUser(this.model);
    console.log(this.model);
  }

}