import { Component, OnInit } from '@angular/core';
import { Lab } from '../exercise';
import { LabService } from '../lab.service';


@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {
  


  constructor(private labService: LabService) { }

  labs: Lab;

  ngOnInit(): void {
    this.labService.getLabs().subscribe(response => {
      this.labs = response;
    });
    
  }

}
