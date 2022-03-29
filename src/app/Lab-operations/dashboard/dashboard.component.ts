import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/User-operations/login/login.component';
import { User } from 'src/app/User-operations/user';
import { SignUpService } from 'src/app/User-operations/user.service';
import { Lab } from '../exercise';
import { LabService } from '../lab.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showFiller = false;
  labs = new Lab();
  isAdmin: boolean;
  a: any[];

   constructor(private userService: SignUpService, private labService: LabService){ 
     this.hideButton();
     
  }

  ngOnInit(): void {
    this.labService.getLabs().subscribe(response => {
      this.labs = response;
    });
    
  }

  login: LoginComponent;
  
  async hideButton(){
   this.isAdmin = await this.userService.displayButton(this.isAdmin);
  }

}
