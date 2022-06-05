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
    { src: 'https://media.discordapp.net/attachments/757664932236886218/983081340251562024/unknown.png'},
    { src: 'https://static.cdnlogo.com/logos/c/68/c-sharp-800x800.png'},  
    { src: 'https://cdn.discordapp.com/attachments/757664932236886218/983083192875638835/Webp.net-resizeimage.png'},  
  ]

  labMasters = [
    {name: 'Martin Popper',text: 'Spring-boot, Angular', src: 'https://media-exp1.licdn.com/dms/image/C5603AQFaGvIp9iVCCg/profile-displayphoto-shrink_200_200/0/1517232084954?e=2147483647&v=beta&t=zbxqQRKydbuyhy0ey7-MniL0fZbGMVtw-BF8mrtWlhs'},
    {name: 'Roman Popper', text: 'C#', src: 'https://resizeimage.net/mypic/1aFN6HwNhEkSHOIy/Wu8dH/roman-popper.jpg'},
    {name: 'Katarína Hrabovská' ,text: 'Spring-boot, Angular', src: 'https://icon-library.com/images/profile-photo-icon/profile-photo-icon-27.jpg'},
  
  ]

}
