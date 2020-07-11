import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebuserlistComponent } from './webuserlist.component';

describe('WebuserlistComponent', () => {
  let component: WebuserlistComponent;
  let fixture: ComponentFixture<WebuserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebuserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
