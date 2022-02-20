import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { User } from 'src/app/User-operations/user';
import { SignUpService } from 'src/app/User-operations/user.service';

@Component({
  selector: 'app-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.css']
})
export class LabFormComponent implements OnInit {

  constructor(private userService: SignUpService) { }
  user = new User('','','','','');

  labMaster = this.userService.cookieService.get('username', this.user.username);
  
  inLab = [this.labMaster];

  notInLab = ['peter', 'marek', 'zdenek', 'jano','robo', 'zdeno', 'karel'];

  ngOnInit(): void {
    console.log();
    
  }

  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
