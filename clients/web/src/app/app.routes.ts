import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CreateProjectComponent } from './pages/projects/create-project/create-project.component';
import { EditProjectComponent } from './pages/projects/edit-project/edit-project.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home - ColossusPM',
    component: IndexComponent,
  },
  {
    path: 'projects/create',
    title: 'New Project - ColossusPM',
    component: CreateProjectComponent,
  },
  {
    path: 'projects/:id/edit',
    title: 'Edit Project - ColossusPM',
    component: EditProjectComponent,
  },
];
