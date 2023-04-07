import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { User } from 'src/app/User-operations/user';
import { SignUpService } from 'src/app/User-operations/user.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LabService } from '../lab.service';

@Component({
  selector: 'app-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.css']
})
export class LabFormComponent implements OnInit {

  constructor(private userService: SignUpService, fb: UntypedFormBuilder, private labService: LabService) { } 

  labName = '';

  user = new User('', '', '', '', '');

  description = '';

  toppings: UntypedFormGroup;

  labMaster = localStorage.getItem('username');
  
  inLab: string[] = [];

  test: boolean = true;
  
  notInLab: string[] = [];
  
  // test = this.userService.getAllUsers1();

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(response => this.notInLab = response);
  }

  onSubmit(){
    
    this.labService.createLab(this.inLab, this.labName, this.description);    
  }

  addToLab(item: string){
    this.inLab.push(item);
    this.notInLab = this.notInLab.filter(h => h !== item);
  }
  
  deleteFromLab(item: string){
    this.inLab = this.inLab.filter(h => h !== item);
    this.notInLab.push(item);
  }

  

}