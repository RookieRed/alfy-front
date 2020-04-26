import {Component, OnInit, ViewChild, NgModule} from '@angular/core';
import {IImage} from 'ng-simple-slideshow';
import {PageService} from '../../services/page.service';
import {environment} from '../../../environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AboutService } from 'src/app/services/about.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Section, HTMLSection } from 'src/app/models/sections';
import { EventTile } from 'src/app/models/event.tile';


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
  private agenda : Section;
  private intro : HTMLSection;
  private slides_about : Section;
  private sponsors : Section;
  private photos : File[];
  private evenements : EventTile[];
  private sponsorList: EventTile[];

  private backgroundImages: (string)[] = [];

  constructor(
    private aboutService : AboutService,
  ) { }

  ngOnInit() {
   this.getAbout();
  }

  async getAbout() {
    await this.aboutService.getAbout().then((resp: any) => {
      const respObj = resp;
      this.agenda = <Section>respObj.sections.agenda;
      this.evenements = <EventTile[]>this.agenda['tiles'];
      this.intro = <HTMLSection>respObj.sections.intro;
      this.editorData = this.intro['html'];
      this.slides_about = <Section>respObj.sections['slides-about'];
      this.photos = this.slides_about['photos'];
      this.caroussel(this.photos);
      this.sponsors = <Section>respObj.sections.sponsors;
      this.sponsorList = <EventTile[]>this.sponsors['tiles'];
      console.log(this.sponsorList);


    }, err => {
      this.onApiError(err);
    });
  }

  callback() {
  }

  private onApiError(err) {
    console.error(err);
  }

  caroussel(photos) {
    var i : number = 0;
    for(let photo of photos) {
      this.backgroundImages[i] = environment.apiURL + photo.fullPath;
      i++;
    }
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
    this.intro.html = this.editorData;
    this.aboutService.updatePresentation(this.intro).toPromise().then(
      res => {console.log("Succes")}
    ).catch();
  }


}
