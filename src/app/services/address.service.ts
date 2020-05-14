import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public findCountries(search?: string) {
    const url = environment.apiURL + '/countries'
      + (search != null && search.length > 0 ? '?&search=' + search : '');
    return this.http.get(url).toPromise();
  }
}
