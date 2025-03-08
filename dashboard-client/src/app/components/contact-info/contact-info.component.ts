import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface ContactLink {
  url: string;
  icon: string;
  label: string;
  text: string;
}

interface ContactPair {
  first: ContactLink;
  second?: ContactLink;
}

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent implements OnInit {
  contactPairs: ContactPair[] = [];
  protected Math = Math;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ contactLinks: ContactLink[] }>('/json/contact-links.json')
      .subscribe((data) => {
        // Group links into pairs
        for (let i = 0; i < data.contactLinks.length; i += 2) {
          this.contactPairs.push({
            first: data.contactLinks[i],
            second: data.contactLinks[i + 1],
          });
        }
      });
  }
}
