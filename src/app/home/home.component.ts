import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showNavigationArrows = false;
  showNavigationIndicators = false;

  images = [
    { src: 'https://i.pinimg.com/originals/64/4e/7b/644e7b96ce4212a3cce17b263ed03fd4.png'},
    { src: 'https://thumbs.dreamstime.com/b/java-logo-editorial-illustrative-white-background-eps-download-vector-jpeg-banner-java-logo-editorial-illustrative-white-208329454.jpg'},
    { src: 'https://static.cdnlogo.com/logos/c/68/c-sharp-800x800.png'},  
  ]

}
