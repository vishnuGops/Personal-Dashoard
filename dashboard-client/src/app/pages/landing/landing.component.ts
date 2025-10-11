import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LandingHeroComponent } from '../../components/landing-hero/landing-hero.component';
import { LandingInfoComponent } from '../../components/landing-info/landing-info.component';
import { LandingInfo2Component } from "../../components/landing-info-2/landing-info-2.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    LandingHeroComponent,
    LandingInfoComponent,
    LandingInfo2Component
],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {}
