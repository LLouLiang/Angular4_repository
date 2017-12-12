import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaleventComponent } from './personalevent.component';

describe('PersonaleventComponent', () => {
  let component: PersonaleventComponent;
  let fixture: ComponentFixture<PersonaleventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaleventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaleventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
