import { Component } from '@angular/core';
import { ProjectsHeroComponent } from '../../components/projects-hero/projects-hero.component';
import { ProjectsInfoComponent } from '../../components/projects-info/projects-info.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectsHeroComponent, ProjectsInfoComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}
