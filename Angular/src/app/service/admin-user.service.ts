import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private _http: HttpClient) { }

  GetAll() {
    return this._http.get(environment.apiurl + "/api/admin");
  }
  Delete(id) {
    return this._http.post(environment.apiurl + "/api/admin/delete", { id: id });
  }
  Add(data) {
    return this._http.post(environment.apiurl + "/api/admin/add", data);
  }
  GetByID(id) {
    return this._http.get(environment.apiurl + "/api/admin/" + id);
  }
  Update(data) {
    return this._http.post(environment.apiurl + "/api/admin/update", data);
  }
}
