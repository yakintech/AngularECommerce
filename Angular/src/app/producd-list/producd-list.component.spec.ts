import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducdListComponent } from './producd-list.component';

describe('ProducdListComponent', () => {
  let component: ProducdListComponent;
  let fixture: ComponentFixture<ProducdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
