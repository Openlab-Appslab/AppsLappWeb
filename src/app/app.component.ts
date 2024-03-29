import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SignUpService } from './User-operations/user.service';
import { LabService } from './Lab-operations/lab.service';
import { Lab } from './Lab-operations/exercise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppsLapp-web';
  showFiller = false;
  currentLabName: string | null;
  currentLabId: number | null;
  labs: Lab[] =[];


  constructor(private userService: SignUpService, private cookieService: NgxEncryptCookieService, private router: Router, private bottomSheet: MatBottomSheet, private labService: LabService, private route: ActivatedRoute){
    let username = localStorage.getItem('username');
    //get role from local storage
    let role = localStorage.getItem('authority');
    this.role = role;    
    this.userName = username ? username : '';
    this.currentLabName = localStorage.getItem('currentLabName');    
    this.currentLabId = this.cookieService.get('currentLabId', false)
    }


    ngOnInit(): void {
      this.labService.getLabs('labmaster').subscribe(response => {
        this.labs = response;
      });
    }    
  isLogged: boolean = false;

  role = localStorage.getItem('authority');
  userName: string = '';

  signOut(){
    this.userService.logOut();
    this.userName = '';
    this.router.navigate(['/login']);
  }

  setCurrentLab(lab: Lab){
    //set it to cookie
    this.cookieService.set('currentLabId', lab.id, false);
    this.cookieService.set('currentLabName', lab.name, false);
  }
  

  onSubmit(){
  }

  @ViewChild('templateBottomSheet') TemplateBottomSheet: TemplateRef<any>;

  openTemplateSheetMenu() {
    // this.getUser();
    this.bottomSheet.open(this.TemplateBottomSheet);
  }

  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }
  


  // getUser(){
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.labService.getStudent(id).subscribe(response => {
  //     this.user = response;
  //   });
  // }
}
