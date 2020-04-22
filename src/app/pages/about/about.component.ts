import {Component, OnInit, ViewChild, NgModule} from '@angular/core';
import {IImage} from 'ng-simple-slideshow';
import {PageService} from '../../services/page.service';
import {PageInfo} from '../../models/page';
import {environment} from '../../../environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public Editor = ClassicEditor;
  private editorBool : boolean = false;
  private editorData : String;

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
