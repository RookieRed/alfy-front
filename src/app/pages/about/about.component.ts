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

  @ViewChild('slideshow') slideshow;
  backgroundImages:  IImage[] = [];

  constructor(
    private pageService: PageService,
  ) { }

  ngOnInit() {
    this.pageService.getPage('about')
      .then((response) => {
        const pageInfo: PageInfo = response;
        pageInfo.files.forEach(file => {
          const iImage: IImage = Object.assign(file.options, { url: environment.apiURL + '/' + file.path });
          this.backgroundImages.push(iImage);
        });
      }).catch(console.error);
  }

  callback() {
    console.log('click');
  }
  


}
