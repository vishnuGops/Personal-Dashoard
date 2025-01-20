import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landing-hero',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule],
  templateUrl: './landing-hero.component.html',
  styleUrls: ['./landing-hero.component.scss'],
})
export class LandingHeroComponent {}
