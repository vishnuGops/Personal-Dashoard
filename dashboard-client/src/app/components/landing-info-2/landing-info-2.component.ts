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
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 1' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 2' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 3' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 4' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 5' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 6' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 7' },                                       
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 8' }, 
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 9' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 10' },   
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 11' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 12' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 13' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 14' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 15' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 16' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 17' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 18' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 19' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 20' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 21' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 22' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 23' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 24' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 25' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 26' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 27' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 28' },
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 29' },  
    { src: 'images/Gallery/Vishnu-1.jpg', alt: 'Project 30' }
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
