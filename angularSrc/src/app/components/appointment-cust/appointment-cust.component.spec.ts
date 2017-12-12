import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCustComponent } from './appointment-cust.component';

describe('AppointmentCustComponent', () => {
  let component: AppointmentCustComponent;
  let fixture: ComponentFixture<AppointmentCustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentCustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
