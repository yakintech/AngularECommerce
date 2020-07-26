import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebuserService {

  constructor(private _http:HttpClient) { }

  GetAllWebusers(){
    return this._http.get(environment.apiurl + "/api/webuser");
  }

  Deletewebuser(id){
    return this._http.post(environment.apiurl + "/api/webuser/delete",{id:id});

  }

  AddWebuser(data){
    return this._http.post(environment.apiurl + "/api/webuser/add",data);
  }

  GetWebuserByID(id){
    return this._http.get(environment.apiurl + "/api/webuser/" + id);
  }

  UpdateWebUser(data){
    return this._http.post(environment.apiurl + "/api/webuser/update",data);
  }
}
