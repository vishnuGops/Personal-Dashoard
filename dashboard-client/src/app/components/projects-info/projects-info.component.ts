import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface Projects {
  name: string;
  description: string;
  githubLink: string;
  image: string;
}

@Component({
  selector: 'app-projects-info',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './projects-info.component.html',
  styleUrls: ['./projects-info.component.scss']
})
export class ProjectsInfoComponent implements OnInit{
  projectsData: Projects[][] = []; // Array of arrays for rows

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ projects: Projects[] }>('/json/projects-data.json').subscribe(data => {
      const projects = data.projects;
      this.projectsData = this.groupIntoRows(projects,3);
    });
  }

  private groupIntoRows(array: Projects[], size: number): Projects[][] {
    const rows: Projects[][] = [];
    for (let i = 0; i < array.length; i += size) {
      rows.push(array.slice(i, i + size));
    }
    return rows;
  }

}
