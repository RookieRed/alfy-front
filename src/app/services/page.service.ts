import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiFile} from "../models/file";
import {HTMLSection} from "../models/sections";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getPage(pageName: string): Promise<any> {
    return this.http.get(environment.apiURL + '/pages/' + pageName).toPromise();
  }

  public uploadFile(pageName: string, uploadedPicture: File) {
    const form = new FormData();
    form.append('file', uploadedPicture, uploadedPicture.name);
    return this.http.post(environment.apiURL + '/pages/' + pageName + '/file', form).toPromise();
  }

  public updatePicturesConfigAboutPage(pageName: string, files: ApiFile[]) {
    return this.http.post(environment.apiURL + '/pages/' + pageName + '/files-config', files).toPromise();
  }

  public updateHtmlContent(section: HTMLSection) {
    const payload = { id: section.id, html: section.html, title: section.title };
    return this.http.put(environment.apiURL + '/pages-sections/html/' + section.id, payload).toPromise();
  }
}
