import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about-hero',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule],
  templateUrl: './about-hero.component.html',
  styleUrl: './about-hero.component.scss',
})
export class AboutHeroComponent {}
