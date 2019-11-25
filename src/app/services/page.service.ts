import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PageContent, PageFile} from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private http: HttpClient,
  ) { }

  public getPage(pageName: string): Promise<any> {
    return this.http.get(environment.apiURL + '/pages/' + pageName).toPromise();
  }

  public  uploadFile(pageName: string, uploadedPicture: File) {
    const form = new FormData();
    form.append('file', uploadedPicture, uploadedPicture.name);
    return this.http.post(environment.apiURL + '/pages/' + pageName + '/file', form).toPromise();
  }

  public updatePicturesConfigAboutPage(pageName: string, files: PageFile[]) {
    return this.http.post(environment.apiURL + '/pages/' + pageName + '/files-config', files).toPromise();
  }

  public updatePageContent(pageName: string, content: PageContent) {
    return this.http.post(environment.apiURL + '/pages/' + pageName + '/' + content.id, content).toPromise();
  }
}
