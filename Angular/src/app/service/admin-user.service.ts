import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private _http: HttpClient) { }

  GetAll() {
    return this._http.get("http://localhost:3000/api/admin");
  }
  Delete(id) {
    return this._http.post("http://localhost:3000/api/admin/delete", { id: id });
  }
  Add(data) {
    return this._http.post("http://localhost:3000/api/admin/add", data);
  }
  GetByID(id) {
    return this._http.get("http://localhost:3000/api/admin/" + id);
  }
  Update(data) {
    return this._http.post("http://localhost:3000/api/admin/update", data);
  }
}
