import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact-hero',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule],
  templateUrl: './contact-hero.component.html',
  styleUrl: './contact-hero.component.scss',
})
export class ContactHeroComponent {}
