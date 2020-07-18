import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class sliderService {

  constructor(private _http: HttpClient) { }

  GetAll() {
    return this._http.get("http://localhost:3000/api/slider");
  }
  GetByID(id) {
    return this._http.get("http://localhost:3000/api/slider/" + id);
  }
  Delete(id) {
    return this._http.post("http://localhost:3000/api/slider/delete", { id: id });
  }
  Add(data) {
    return this._http.post("http://localhost:3000/api/slider/add", data);
  }
  Update(data) {
    return this._http.post("http://localhost:3000/api/slider/update", data);
  }
}
