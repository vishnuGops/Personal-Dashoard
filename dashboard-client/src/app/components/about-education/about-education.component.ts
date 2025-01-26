import { Component } from '@angular/core';

@Component({
  selector: 'app-about-education',
  standalone: true,
  templateUrl: './about-education.component.html',
  styleUrls: ['./about-education.component.scss']
})
export class AboutEducationComponent {
  downloadResume(): void {
    const link = document.createElement('a');
    link.href = '/pdf/Vishnu_Resume.pdf'; // Path to your resume PDF
    link.download = 'Vishnu_Resume.pdf';
    link.click();
  }
}
