import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatesComponent } from './star-rates.component';

describe('StarRatesComponent', () => {
  let component: StarRatesComponent;
  let fixture: ComponentFixture<StarRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
