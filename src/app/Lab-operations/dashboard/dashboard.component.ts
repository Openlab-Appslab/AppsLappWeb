import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog/dialog';
import { LoginComponent } from 'src/app/User-operations/login/login.component';
import { User } from 'src/app/User-operations/user';
import { SignUpService } from 'src/app/User-operations/user.service';
import { Exercise, Lab } from '../exercise';
import { LabService } from '../lab.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loaded: boolean = true;
  showFiller = false;
  labs: Lab[] =[]
  
  isAdmin: boolean;
  a: any[];

   constructor(private userService: SignUpService, private labService: LabService, ){ 
     this.hideButton();
     
  }

  ngOnInit(): void {
    this.labService.getLabs().subscribe(response => {
      this.loaded = false;
      this.labs = response;
    });
    
  }

  login: LoginComponent;
  
  async hideButton(){
   this.isAdmin = await this.userService.displayButton(this.isAdmin);
  }

  

}
