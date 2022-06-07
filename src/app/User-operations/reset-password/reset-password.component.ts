import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignUpService } from '../user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: SignUpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(event => {
      this.username = event['username'];
     });
  }

  username: string;
  password: string;
  repeatPassword: string;


  onSubmit() {
    this.userService.submitNewPassword(this.username, this.password);
  }

}
