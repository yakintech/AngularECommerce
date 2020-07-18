import { Component, OnInit } from '@angular/core';
import { WebuserService } from 'app/service/webuser.service';
import { FormGroup, FormControl } from '@angular/forms';
import { webuser } from 'app/models/webuser';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-webuserlist',
  templateUrl: './webuserlist.component.html',
  styleUrls: ['./webuserlist.component.css']
})
export class WebuserlistComponent implements OnInit {

  webusers: [];

  kisiform = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    _id: new FormControl(''),


  })
  constructor(private _webuserservice: WebuserService,private socket:Socket) { }

  ngOnInit(): void {
    this.Load();

    this.socket.on("merhabaclient",()=>{
      console.log("Client tetiklendi");
    })


  }



  Delete(id) {
    this._webuserservice.Deletewebuser(id).subscribe((q) => {
      this.Load();
    })
  }

  Load() {
    this._webuserservice.GetAllWebusers().subscribe((data: []) => {
      this.webusers = data;
    })
  }

  GetData(id) {
    this._webuserservice.GetWebuserByID(id).subscribe((data: webuser) => {
      this.kisiform.setValue({ name: data.name, surname: data.surname, phone: data.phone, address: data.address, email: data.email, _id: data._id });

    })
  }

  onSubmit() {

    this._webuserservice.AddWebuser(this.kisiform.value).subscribe((q) => {
      this.Load();
      this.kisiform.reset();
    });
  }

  guncelle() {
    this._webuserservice.UpdateWebUser(this.kisiform.value).subscribe((q) => {
      this.Load();
      this.kisiform.reset();
    })
  }

  sockettest(){
    this.socket.emit("merhabaserver");

    this.socket.emit("clientpush");
  }

}
