import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSuperComponent } from './appointment-super.component';

describe('AppointmentSuperComponent', () => {
  let component: AppointmentSuperComponent;
  let fixture: ComponentFixture<AppointmentSuperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentSuperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
