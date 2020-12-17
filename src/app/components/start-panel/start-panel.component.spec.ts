import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPanelComponent } from './start-panel.component';

describe('StartPanelComponent', () => {
  let component: StartPanelComponent;
  let fixture: ComponentFixture<StartPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
