import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit, OnDestroy {

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('ALFY : page introuvable');
  }

  ngOnDestroy() {
    this.title.setTitle('ALFY');
  }
}
