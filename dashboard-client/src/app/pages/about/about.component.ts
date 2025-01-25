import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AboutHeroComponent } from '../../components/about-hero/about-hero.component';
import { AboutExperienceComponent } from '../../components/about-exprience/about-experience.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    AboutHeroComponent,
    AboutExperienceComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
