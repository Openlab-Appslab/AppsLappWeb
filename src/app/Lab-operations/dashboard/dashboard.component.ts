import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../exercise';
import { LabService } from '../lab.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loaded: boolean = true;
  showFiller = false;
  labs: Lab[] =[];
  lab: Lab;
  
  isStudent: boolean = false;
  a: any[];

   constructor(private router: Router, private labService: LabService, ){ 
     
   }

  ngOnInit(): void {
    this.labService.getLabs().subscribe(response => {
      this.loaded = false;
      this.labs = response;
      this.lab = response[0]
    });

    if(this.isStudent == true){
      this.router.navigate(['/lab-detail']);
     }
  }
}
