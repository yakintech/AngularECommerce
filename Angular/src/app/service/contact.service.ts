import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class contactService {

  constructor(private _http: HttpClient) { }

  GetAll() {
    return this._http.get(environment.apiurl + "/api/contact");
  }

  Delete(id) {
    return this._http.post(environment.apiurl + "/api/contact/delete", { id: id });

  }

  Add(data) {
    return this._http.post(environment.apiurl + "/api/contact/add", data);
  }

  GetByID(id) {
    return this._http.get(environment.apiurl + "/api/contact/" + id);
  }

  Update(data) {
    return this._http.post(environment.apiurl + "/api/contact/update", data);
  }
}
