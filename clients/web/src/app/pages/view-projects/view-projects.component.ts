import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService, Project } from '../../services/database.service';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule, MessageModule],
  templateUrl: './view-projects.component.html',
  styleUrl: './view-projects.component.css',
})
export class ViewProjectsComponent {
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
    this._router.navigate(['/projects', project.id, 'view']);
  }
}
