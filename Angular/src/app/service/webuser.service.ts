import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebuserService {

  constructor(private _http:HttpClient) { }

  GetAllWebusers(){
    return this._http.get("http://localhost:3000/api/webuser");
  }

  Deletewebuser(id){
    return this._http.post("http://localhost:3000/api/webuser/delete",{id:id});

  }

  AddWebuser(data){
    return this._http.post("http://localhost:3000/api/webuser/add",data);
  }

  GetWebuserByID(id){
    return this._http.get("http://localhost:3000/api/webuser/" + id);
  }

  UpdateWebUser(data){
    return this._http.post("http://localhost:3000/api/webuser/update",data);
  }
}
