import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { SignUpService } from './User-operations/user.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppsLapp-web';
  showFiller = false;

  constructor(private userService: SignUpService, private cookieService: NgxEncryptCookieService, private router: Router, private bottomSheet: MatBottomSheet){
     this.userName = this.cookieService.get('username', false); 
    }

    
  isLogged: boolean = false;

  userName: string = '';

  signOut(){
    this.userService.logOut();
    this.userName = '';
    this.router.navigate(['/login']);
  }

  

  onSubmit(){
  }

  @ViewChild('templateBottomSheet') TemplateBottomSheet: TemplateRef<any>;

  openTemplateSheetMenu() {
    this.bottomSheet.open(this.TemplateBottomSheet);
  }

  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }
}
