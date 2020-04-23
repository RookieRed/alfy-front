import {Component, OnInit, ViewChild, NgModule} from '@angular/core';
import {IImage} from 'ng-simple-slideshow';
import {PageService} from '../../services/page.service';
import {environment} from '../../../environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AboutService } from 'src/app/services/about.service';
import { Page } from 'src/app/models/page';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public Editor = ClassicEditor;
  private editorBool : boolean = false;
  private editorData : String;
  private title : String;

  backgroundImages: (string)[] = [
    "/assets/img/logo-alfy.jpg",
    "/assets/img/anciens-voyagent.jpg"    
  ];
  
  constructor(
    private aboutService : AboutService,
  ) { }

  ngOnInit() {
   this.getAbout();
  }

  async getAbout() {
    await this.aboutService.getAbout().then((resp: any) => {
      const respObj = resp;
      //this.title = <String>respObj.title;
      console.log(respObj);

      //this.intro = (new DOMParser().parseFromString(respObj.sections[0].html, "text/xml")).firstChild.textContent;
      //console.log(this.intro);
    }, err => {
      this.onApiError(err);
    });
  }

  callback() {
  }

  private onApiError(err) {
    console.error(err);
  }

  goToPartenaire() {
    console.log("Vous venez de cliquer sur un partenaire. Une fonction sera bientôt implémentaire pour cela.");
  }

  showEditor() {
    this.editorBool = true;
  }

  showPresentation() {
    this.editorBool = false;
    //this.editorData = this.Editor.getData();
    //this.saveEditorData();
  }

  saveEditorData() {
    //const editorData = this.Editor.getData();
    //return editorData;
  }

}
