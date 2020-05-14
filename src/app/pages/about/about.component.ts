import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {EventsTilesSection, HTMLSection, Section, SlidesShowSection} from 'src/app/models/sections';
import {EventTile} from 'src/app/models/event.tile';
import {ApiFile} from "../../models/file";
import {AccountService} from "../../services/account.service";
import {UserRoles} from "../../models/user";
import {PageService} from "../../services/page.service";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public isLoading = true;
  public editor = ClassicEditor;
  public editorData: string;
  public intro: HTMLSection;
  public evenements: EventTile[];
  public sponsorList: EventTile[];
  public backgroundImages: string[];
  public editorBool = false;
  public readonly isAdmin: boolean;

  private readonly pageName = 'about';

  constructor(
    private pageService: PageService,
    private accountService: AccountService
  ) {
    this.isAdmin = this.accountService.getConnectedUserRole() === UserRoles.ADMIN;
  }

  ngOnInit() {
    this.getAbout();
  }

  getAbout() {
    this.isLoading = true;
    this.pageService.getPage(this.pageName).then((resp: any) => {
      const respObj = resp;
      this.intro = <HTMLSection>respObj.sections.intro;
      this.editorData = this.intro['html'];
      this.setUpCaroussel((<SlidesShowSection>respObj.sections['slides-about']).photos);
      const agenda = <Section>respObj.sections.agenda;
      const sponsors = <EventsTilesSection>respObj.sections.sponsors;
      this.evenements = (<EventTile[]> agenda['tiles']).map(this.mapApiFullPathForEvents);
      this.sponsorList = (<EventTile[]> sponsors['tiles']).map(this.mapApiFullPathForEvents);
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.isLoading = false;
    });
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
    this.pageService.updateHtmlContent(this.intro).then(
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
