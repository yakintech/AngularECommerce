import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminUserService } from 'app/service/admin-user.service';
import { adminUserModel } from 'app/models/adminUserModel';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  adminusers = [];

  form = new FormGroup({
    title: new FormControl(''),
    imgpath: new FormControl(''),
    _id: new FormControl('')
  })

  constructor(private _adminUserService: AdminUserService) { }

  ngOnInit(): void {
    this.Load();
  }

  Delete(id) {
    this._adminUserService.Delete(id).subscribe((q) => {
      this.Load();
    })
  }

  Load() {
    this._adminUserService.GetAll().subscribe((data: []) => {
      this.adminusers = data;
    })
  }

  GetData(id) {
    this._adminUserService.GetByID(id).subscribe((data: adminUserModel) => {
      this.form.setValue({ email: data.email, password: data.password });
    })
  }

  // onSubmit() {
  //   this._adminUserService.Add(this.form.value).subscribe((q) => {
  //     this.Load();
  //     this.form.reset();
  //   });
  // }

  // guncelle() {
  //   this._adminUserService.Update(this.form.value).subscribe((q) => {
  //     this.Load();
  //     this.form.reset();
  //   })
  // }
}
