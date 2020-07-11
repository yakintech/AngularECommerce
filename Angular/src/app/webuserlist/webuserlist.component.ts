import { Component, OnInit } from '@angular/core';
import { WebuserService } from 'app/service/webuser.service';

@Component({
  selector: 'app-webuserlist',
  templateUrl: './webuserlist.component.html',
  styleUrls: ['./webuserlist.component.css']
})
export class WebuserlistComponent implements OnInit {

  webusers: [];
  constructor(private _webuserservice: WebuserService) { }

  ngOnInit(): void {
    this.Load();
  }


  Delete(id) {
    this._webuserservice.Deletewebuser(id).subscribe((q)=>{
      this.Load();
    })
  }

  Load() {
    this._webuserservice.GetAllWebusers().subscribe((data: []) => {
      this.webusers = data;
    })
  }

}
