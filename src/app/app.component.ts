import { Component } from '@angular/core';
import { SignUpService } from './User-operations/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppsLapp-web';
  showFiller = false;

  constructor(private userService: SignUpService){}

  isLogged: boolean = false;


  async hideButton(){
    //this.isLogged = await this.userService.loginUser();
   }
}
