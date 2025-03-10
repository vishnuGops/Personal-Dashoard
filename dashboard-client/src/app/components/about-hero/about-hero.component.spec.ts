import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHeroComponent } from './about-hero.component';

describe('AboutHeroComponent', () => {
  let component: AboutHeroComponent;
  let fixture: ComponentFixture<AboutHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
