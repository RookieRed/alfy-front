import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {AboutService} from 'src/app/services/about.service';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {EventsTilesSection, HTMLSection, Section, SlidesShowSection} from 'src/app/models/sections';
import {EventTile} from 'src/app/models/event.tile';
import {ApiFile} from "../../models/file";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public editor = ClassicEditor;
  private editorBool = false;
  private editorData: string;
  private intro: HTMLSection;
  private evenements: EventTile[];
  private sponsorList: EventTile[];

  private backgroundImages: string[];

  constructor(
    private aboutService: AboutService,
  ) {
  }

  ngOnInit() {
    this.getAbout();
  }

  getAbout() {
    this.aboutService.getAbout().then((resp: any) => {
      const respObj = resp;
      this.intro = <HTMLSection>respObj.sections.intro;
      this.editorData = this.intro['html'];
      this.setUpCaroussel((<SlidesShowSection>respObj.sections['slides-about']).photos);
      const agenda = <Section>respObj.sections.agenda;
      const sponsors = <EventsTilesSection>respObj.sections.sponsors;
      this.evenements = (<EventTile[]> agenda['tiles']).map(this.mapApiFullPathForEvents);
      this.sponsorList = (<EventTile[]> sponsors['tiles']).map(this.mapApiFullPathForEvents);
    }, err => {
      this.onApiError(err);
    });
  }

  private onApiError(err) {
    console.error(err);
  }

  setUpCaroussel(photosCaroussel: ApiFile[]) {
    this.backgroundImages = [];
    for (const photo of photosCaroussel) {
      this.backgroundImages.push(environment.apiURL + photo.fullPath);
    }
  }

  showEditor() {
    this.editorBool = true;
  }

  onEditorChange({editor}: ChangeEvent) {
    this.editorData = editor.getData();
    console.log(this.editorData);
  }

  save() {
    this.editorBool = false;
    this.intro.html = this.editorData;
    this.aboutService.updatePresentation(this.intro).toPromise().then(
      res => {
        console.log("Succes");
      }
    ).catch();
  }

  private mapApiFullPathForEvents(event: EventTile) {
    event.photo.fullPath = environment.apiURL + event.photo.fullPath;
    return event;
  }

}
