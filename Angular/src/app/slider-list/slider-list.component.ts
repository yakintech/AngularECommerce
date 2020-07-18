import { Component, OnInit } from '@angular/core';
import { sliderService } from 'app/service/slider.service';
import { sliderModel } from 'app/models/sliderModel';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.css']
})
export class SliderListComponent implements OnInit {

  sliders = [];

  form = new FormGroup({
    title: new FormControl(''),
    imgpath: new FormControl(''),
    _id: new FormControl('')
  })

  constructor(private _sliderService: sliderService) { }

  ngOnInit(): void {
    this.Load();
  }

  Delete(id) {
    this._sliderService.Delete(id).subscribe((q) => {
      this.Load();
    })
  }

  Load() {
    this._sliderService.GetAll().subscribe((data: []) => {
      this.sliders = data;
    })
  }

  GetData(id) {
    this._sliderService.GetByID(id).subscribe((data: sliderModel) => {
      this.form.setValue({ title: data.title, imgpath: data.imgpath });
    })
  }

  // onSubmit() {

  //   this._sliderService.Add(this.form.value).subscribe((q) => {
  //     this.Load();
  //     this.form.reset();
  //   });
  // }

  // guncelle() {
  //   this._sliderService.Update(this.form.value).subscribe((q) => {
  //     this.Load();
  //     this.form.reset();
  //   })
  // }
}
