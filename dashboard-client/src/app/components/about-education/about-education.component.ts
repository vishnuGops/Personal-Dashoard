import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Education {
  institution: string;
  logo: string;
  url: string;
  period: string;
  location: string;
  courses: string[];
}

@Component({
  selector: 'app-about-education',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './about-education.component.html',
  styleUrls: ['./about-education.component.scss']
})

export class AboutEducationComponent implements OnInit {
  educationData: Education[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ education: Education[] }>('/json/education-data.json').subscribe(data => {
      this.educationData = data.education;
    });
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = '/pdf/Vishnu_Resume.pdf'; // Path to your resume PDF
    link.download = 'Vishnu_Resume.pdf';
    link.click();
  }
}
