import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Snowflake } from '@theinternetfolks/snowflake';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { DatabaseService, Project } from '../../services/database.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    MessageModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './view-projects.component.html',
  styleUrl: './view-projects.component.css',
})
export class ViewProjectsComponent implements OnInit {
  projects: Project[] = [];
  displayModal: boolean = false;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(
    private _router: Router,
    private _databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    this.projects = await this._databaseService.getAllProjects();
  }

  showModal() {
    this.displayModal = true;
  }

  hideModal() {
    this.displayModal = false;
    this.form.reset();
  }

  async create() {
    if (this.form.invalid) return;

    const projectId = Snowflake.generate();
    await this._databaseService.createProject({
      id: projectId,
      name: this.form.value.name!,
      description: this.form.value.description || '',
      createdAt: new Date(),
    });

    this.displayModal = false;
    this.form.reset();
    this.projects = await this._databaseService.getAllProjects();
    this._router.navigate(['/projects', projectId, 'view']);
  }

  openProject(project: Project) {
    this._router.navigate(['/projects', project.id, 'view']);
  }
}
