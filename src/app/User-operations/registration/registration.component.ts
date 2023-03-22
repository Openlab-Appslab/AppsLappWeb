import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  model = new User('', '', '', '','');
  gitName: string = '';

  loading: boolean = false;

  onSubmit(){
    this.loading = true;
    
    this.userService.createUser(this.model, this.gitName).then(() => { this.loading = false });;
  }
}