import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { filter } from 'rxjs/operators';
import { SignUpService } from 'src/app/User-operations/user.service';




@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor() { }

  

  ngOnInit(): void {
   
  }

}
