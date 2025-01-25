import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AboutHeroComponent } from '../../components/about-hero/about-hero.component';
import { AboutInfoComponent } from '../../components/about-info/about-info.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    AboutHeroComponent,
    AboutInfoComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
