import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../../services/database.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-settings',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    TextareaModule,
  ],
  templateUrl: './project-settings.component.html',
  styleUrl: './project-settings.component.css',
})
export class ProjectSettingsComponent implements OnInit {
  form!: FormGroup;
  projectId!: string;
  projectFound: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _databaseService: DatabaseService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.projectId = this._route.snapshot.paramMap.get('id')!;

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
    });

    const existingProject = await this._databaseService.getProject(
      this.projectId
    );

    if (!existingProject) {
      // If project does not exist, redirect to home
      this._router.navigate(['/']);
      return;
    }

    this.projectFound = true;

    this.form.setValue({
      name: existingProject.name,
      description: existingProject.description || '',
    });
  }

  async save() {
    if (this.form.invalid) return;

    await this._databaseService.updateProject({
      id: this.projectId,
      name: this.form.value.name!,
      description: this.form.value.description || '',
      createdAt: new Date(), // You can keep createdAt immutable if you want
    });

    this._router.navigate(['/']);
  }
}
