import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Project } from '../../../services/database.service';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from '../../../components/project-views/kanban/kanban.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [CommonModule, KanbanComponent, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
})
export class ProjectViewComponent implements OnInit {
  projectId!: string;
  projectName: string = '';
  projectFound = false;
  isEditingName = false;
  newProjectName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    await this.loadProject();
  }

  async loadProject() {
    const project = await this._databaseService.getProject(this.projectId);

    if (project) {
      this.projectName = project.name || 'Untitled Project';
      this.projectFound = true;
    } else {
      this.projectFound = false;
    }
  }

  editProjectName() {
    this.isEditingName = true;
    this.newProjectName = this.projectName;
  }

  async saveProjectName() {
    if (this.newProjectName.trim()) {
      const project = await this._databaseService.getProject(this.projectId);
      if (project) {
        project.name = this.newProjectName.trim();
        await this._databaseService.updateProject(project);
        this.projectName = this.newProjectName.trim();
        this.isEditingName = false;
      }
    }
  }

  cancelEditName() {
    this.isEditingName = false;
  }

  goToSettings() {
    this.router.navigate(['/projects', this.projectId, 'settings']);
  }
}