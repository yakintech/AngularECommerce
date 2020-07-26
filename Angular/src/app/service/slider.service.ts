import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class sliderService {

  constructor(private _http: HttpClient) { }

  GetAll() {
    return this._http.get(environment.apiurl + "/api/slider");
  }
  GetByID(id) {
    return this._http.get(environment.apiurl + "/api/slider/" + id);
  }
  Delete(id) {
    return this._http.post(environment.apiurl + "/api/slider/delete", { id: id });
  }
  Add(data) {
    return this._http.post(environment.apiurl + "/api/slider/add", data);
  }
  Update(data) {
    return this._http.post(environment.apiurl + "/api/slider/update", data);
  }
}
