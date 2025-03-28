import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService, Project } from '../../services/database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  projects: Project[] = [];

  constructor(
    private _router: Router,
    private _databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    this.projects = await this._databaseService.getAllProjects();
  }

  createProject() {
    this._router.navigate(['/projects/create']);
  }

  openProject(project: Project) {
    this._router.navigate(['/projects', project.id, 'edit']);
  }
}
