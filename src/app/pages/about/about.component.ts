import {Component, OnInit, ViewChild, NgModule} from '@angular/core';
import {IImage} from 'ng-simple-slideshow';
import {PageService} from '../../services/page.service';
import {environment} from '../../../environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AboutService } from 'src/app/services/about.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Section } from 'src/app/models/sections';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public editor = ClassicEditor;
  private editorBool : boolean = false;
  private editorData : string;
  private splitData : string[];
  private name : String;
  private sections : Section;

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
      console.log(respObj);
      this.name = <String>respObj.name;
      this.sections = <Section>respObj.sections
      this.editorData = respObj.sections.intro.html;
      console.log(this.sections);
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
  
  onChange( { editor }: ChangeEvent ) {
    this.editorData = editor.getData();
    console.log(  this.editorData );
  }
    
    save(){
    this.editorBool = false;
    
    }
  

}
