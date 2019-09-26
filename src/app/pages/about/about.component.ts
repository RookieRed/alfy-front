import {Component, OnInit, ViewChild} from '@angular/core';
import {IImage} from 'ng-simple-slideshow';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @ViewChild('slideshow') slideshow;
  backgroundImages:  IImage[];

  constructor() { }

  ngOnInit() {
    this.backgroundImages = [
      { url: '/assets/img/alfy-meeting.jpg', caption: 'Caption of the premiere photo', backgroundSize: 'contain'},
      { url: '/assets/img/fustel.jpg', caption: 'Légende de the deuxieme photo'},
      { url: '/assets/img/programme-ete.png', caption: 'La bouffe, on adore !', backgroundSize: 'contain'},
      { url: '/assets/img/anciens-voyagent.jpg', caption: 'Allez, une ptite troisieme photo pour faire zizir', backgroundSize: 'contain'},
    ];
  }

}
