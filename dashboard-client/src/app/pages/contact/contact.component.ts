import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ContactHeroComponent } from '../../components/contact-hero/contact-hero.component';
import { ContactInfoComponent } from '../../components/contact-info/contact-info.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    ContactHeroComponent,
    ContactInfoComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
