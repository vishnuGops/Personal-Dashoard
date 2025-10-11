import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-landing-info-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-info-2.component.html',
  styleUrl: './landing-info-2.component.scss'
})
export class LandingInfo2Component implements AfterViewInit {
  photos = [
    { src: 'images/proj1.svg', alt: 'Project 1' },
    { src: 'images/proj2.svg', alt: 'Project 2' },
    { src: 'images/proj3.svg', alt: 'Project 3' },
    { src: 'images/proj4.svg', alt: 'Project 4' },
    { src: 'images/proj5.svg', alt: 'Project 5' },
    { src: 'images/proj6.svg', alt: 'Project 6' },
    { src: 'images/proj7.svg', alt: 'Project 7' },
    { src: 'images/proj8.svg', alt: 'Project 8' },
    { src: 'images/proj9.svg', alt: 'Project 9' }
  ];

  @ViewChildren('photoItem') photoItems!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.photoItems.forEach(item => {
      observer.observe(item.nativeElement);
    });
  }
}
