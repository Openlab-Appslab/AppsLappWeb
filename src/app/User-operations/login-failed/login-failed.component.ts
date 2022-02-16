import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { User } from '../user';
import { SignUpService } from '../user.service';



@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.css']
})
export class LoginFailedComponent implements OnInit {

  constructor(private userService: SignUpService, private login: LoginComponent) { }

  ngOnInit(): void {
  }

  @Input() user: User;
  
  @Output() resend = new EventEmitter();


  callParrentResend(){
    this.resend.emit();
  }

}
