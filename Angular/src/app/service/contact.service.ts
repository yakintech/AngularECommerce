import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class contactService {

  constructor(private _http: HttpClient) { }

  GetAll() {
    return this._http.get("http://localhost:3000/api/contact");
  }

  Delete(id) {
    return this._http.post("http://localhost:3000/api/contact/delete", { id: id });

  }

  Add(data) {
    return this._http.post("http://localhost:3000/api/contact/add", data);
  }

  GetByID(id) {
    return this._http.get("http://localhost:3000/api/contact/" + id);
  }

  Update(data) {
    return this._http.post("http://localhost:3000/api/contact/update", data);
  }
}
