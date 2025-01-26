import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface Experience {
  company: string;
  url: string;
  logo: string;
  position: string;
  location: string;
  period: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-about-experience',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './about-experience.component.html',
  styleUrls: ['./about-experience.component.scss']
})
export class AboutExperienceComponent implements OnInit {
  experienceData: Experience[][] = []; // Array of arrays for rows

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ experience: Experience[] }>('/json/experience-data.json').subscribe(data => {
      // Group experiences into rows of 2
      const experiences = data.experience;
      this.experienceData = this.groupIntoRows(experiences, 2);
    });
  }

  private groupIntoRows(array: Experience[], size: number): Experience[][] {
    const rows: Experience[][] = [];
    for (let i = 0; i < array.length; i += size) {
      rows.push(array.slice(i, i + size));
    }
    return rows;
  }
}
