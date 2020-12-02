import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsNavbarComponent } from './trips-navbar.component';

describe('TripsNavbarComponent', () => {
  let component: TripsNavbarComponent;
  let fixture: ComponentFixture<TripsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
