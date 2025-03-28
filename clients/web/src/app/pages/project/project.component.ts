import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-project',
  imports: [ReactiveFormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  form!: FormGroup;
  projectId!: string;

  constructor(
    private _route: ActivatedRoute,
    private _databaseService: DatabaseService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.projectId = this._route.snapshot.paramMap.get('id')!;

    // Initialize form manually
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
    });

    const existingProject = await this._databaseService.getProject(
      this.projectId
    );

    if (existingProject) {
      this.form.setValue({
        name: existingProject.name,
        description: existingProject.description || '',
      });
    } else {
      // Create empty project if not found
      await this._databaseService.createProject({
        id: this.projectId,
        name: '',
        description: '',
        createdAt: new Date(),
      });
    }
  }

  async save() {
    if (this.form.invalid) return;

    await this._databaseService.updateProject({
      id: this.projectId,
      name: this.form.value.name,
      description: this.form.value.description,
      createdAt: new Date(),
    });

    this._router.navigate(['/']);
  }
}
