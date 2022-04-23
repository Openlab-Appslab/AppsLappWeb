import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { SignUpService } from './User-operations/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppsLapp-web';
  showFiller = false;

  constructor(private userService: SignUpService, private cookieService: NgxEncryptCookieService, private router: Router){
     this.userName = this.cookieService.get('username', false); 
    }

    
  isLogged: boolean = false;

  userName: string;

  signOut(){
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
