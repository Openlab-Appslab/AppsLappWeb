import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/User-operations/user.service';
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
  authority: string ;

   constructor(private router: Router, private labService: LabService){ 
     if(localStorage.getItem('authority') == 'PUPIL'){
       this.isStudent = true;
       this.authority = 'student';
     }
      else{
        this.isStudent = false;
        this.authority = 'labmaster';
      }
   }

  ngOnInit(): void {
    this.labService.getLabs(this.authority).subscribe(response => {
      this.loaded = false;
      //add lab only if lab.students.length > 0
      for(let i = 0; i < response.length; i++){
        if(response[i].studentNames.length > 0){
          this.labs.push(response[i]);
        }
      }
      console.log(this.labs, 'response');
      // this.userService.cookieService.set('role', 'labMaster', false);
    });

    if(this.isStudent == true){
      this.router.navigate(['/lab-detail']);
     }
  }
}
