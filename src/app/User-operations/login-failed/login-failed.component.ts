import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../user.service';




@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.css']
})
export class LoginFailedComponent implements OnInit {

  constructor(private userService: SignUpService) { }

  ngOnInit(): void {
  }

  username: string;
  displayInput: boolean = false;

  click() {
    this.displayInput = true;
  }

  resendEmail() {
    this.userService.resendEmail(this.username);
  }
}
