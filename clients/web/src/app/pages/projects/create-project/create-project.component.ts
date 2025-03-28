import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    TextareaModule,
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css',
})
export class CreateProjectComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(
    private _databaseService: DatabaseService,
    private _router: Router
  ) {}

  async create() {
    if (this.form.invalid) return;

    const projectId = Snowflake.generate();

    await this._databaseService.createProject({
      id: projectId,
      name: this.form.value.name!,
      description: this.form.value.description || '',
      createdAt: new Date(),
    });

    this._router.navigate(['/']);
  }
}
