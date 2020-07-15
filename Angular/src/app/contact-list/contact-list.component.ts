import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { contactModel } from 'app/models/contactModel';
import { contactService } from 'app/service/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  contacts: [];

  form = new FormGroup({
    email: new FormControl(''),
    message: new FormControl(''),
    _id: new FormControl('')
  })

  constructor(private _contactService: contactService) { }

  ngOnInit(): void {
    this.Load();
  }

  Delete(id) {
    this._contactService.Delete(id).subscribe((q) => {
      this.Load();
    })
  }

  Load() {
    this._contactService.GetAll().subscribe((data: []) => {
      this.contacts = data;
    })
  }

  GetData(id) {
    this._contactService.GetByID(id).subscribe((data: contactModel) => {
      this.form.setValue({ email: data.email, message: data.message });
    })
  }

  onSubmit() {

    this._contactService.Add(this.form.value).subscribe((q) => {
      this.Load();
      this.form.reset();
    });
  }

  guncelle() {
    this._contactService.Update(this.form.value).subscribe((q) => {
      this.Load();
      this.form.reset();
    })
  }

}