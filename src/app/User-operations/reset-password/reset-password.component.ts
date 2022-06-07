import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: SignUpService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;


  onSubmit() {
    this.userService.submitNewPassword(this.username, this.password);
  }

}
