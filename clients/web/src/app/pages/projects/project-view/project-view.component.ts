import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../../services/database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
})
export class ProjectViewComponent implements OnInit {
  projectId!: string;
  projectName: string = '';
  projectFound = false;

  constructor(
    private route: ActivatedRoute,
    private _databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    const project = await this._databaseService.getProject(this.projectId);

    if (project) {
      this.projectName = project.name || 'Untitled Project';
      this.projectFound = true;
    }
  }
}
