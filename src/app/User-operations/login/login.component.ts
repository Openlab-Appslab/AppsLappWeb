import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { AppComponent } from 'src/app/app.component';
import { User } from '../user';
import { SignUpService } from '../user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
 public model: User;
 userName: string;

 loading: boolean;

 @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>
  

  constructor(private userService: SignUpService, private username: AppComponent, private cookieService: NgxEncryptCookieService, private router: Router, public dialog: MatDialog)  { 
    this.model = new User('', '', '','','');
    
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    
  }

  resendEmail(){
    this.userService.resendEmail(this.model.username);
  }
  


  onSubmit(){
    this.loading = true;
    this.userService.loginUser(this.model).then(() => { 
      this.loading = false
      //set username after no error
      if(this.userService.isLoggedIn()){
        this.username.userName = this.model.username;
      }
     })
    
  }


  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef);
    myTempDialog.afterClosed();
  }

  resetPassword(){
    this.userService.resetPassword(this.userName);
  }
}
