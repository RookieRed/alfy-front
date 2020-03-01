import {Component, OnInit, ViewChild} from '@angular/core';
import {IImage} from 'ng-simple-slideshow';
import {PageService} from '../../services/page.service';
import {PageInfo} from '../../models/page';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  backgroundImages: (string)[] = [
    "/assets/img/logo-alfy.jpg",
    "/assets/img/anciens-voyagent.jpg"    
  ];
  
  constructor(
  ) { }

  ngOnInit() {
   
  }

  callback() {
  }


}
