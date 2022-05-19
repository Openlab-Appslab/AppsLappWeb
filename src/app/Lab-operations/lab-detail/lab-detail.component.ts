import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lab } from '../exercise';
import { LabService } from '../lab.service';


@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {
  


  constructor(private labService: LabService,  private route: ActivatedRoute) { }

  lab: Lab;

  ngOnInit(): void {
    this.getLab();
    console.log(this.lab);
    
  }

  getLab(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.labService.getLab(id)
      .subscribe(lab => {
        this.lab = lab;
        this.studentss = lab.studentNames;
      });
  }

  studentss: any[];
  students = [
    {name: 'John', department: 'FE', score: 80},
    {name: 'Mary', department: 'BE', score: 90},
    {name: 'Mike', department: 'BE', score: 70},
    {name: 'Adam', department: 'FE', score: 60},
    {name: 'Peter', department: 'BE', score: 50},
  ];
  
}
