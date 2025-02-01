import { Component } from '@angular/core';
import { ProjectsHeroComponent } from '../../components/projects-hero/projects-hero.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectsHeroComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}
