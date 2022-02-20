import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/User-operations/login/login.component';
import { User } from 'src/app/User-operations/user';
import { SignUpService } from 'src/app/User-operations/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showFiller = false;

  constructor(private userService: SignUpService) { }

  ngOnInit(): void {
    
  }

  login: LoginComponent;
  

}
