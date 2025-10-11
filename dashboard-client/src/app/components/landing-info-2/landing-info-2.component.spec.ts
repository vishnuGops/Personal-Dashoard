import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingInfo2Component } from './landing-info-2.component';

describe('LandingInfo2Component', () => {
  let component: LandingInfo2Component;
  let fixture: ComponentFixture<LandingInfo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingInfo2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingInfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
