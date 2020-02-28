import {Component, OnInit, ViewChild} from '@angular/core';
import {IImage} from 'ng-simple-slideshow';
import {PageService} from '../../services/page.service';
import {PageInfo} from '../../models/page';
import {environment} from '../../../environments/environment';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  /*tiles: Tile[] = [
    {text: 'Carousel', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Agenda', cols: 1, rows: 3, color: 'lightgreen'},
    {text: 'Presentation', cols: 3, rows: 1, color: 'lightpink'},
    {text: 'Actualites', cols: 3, rows: 1, color: '#DDBDF1'},
	  {text: 'Partenaires', cols: 3, rows: 1, color: 'lightblue'},
  ];*/

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
