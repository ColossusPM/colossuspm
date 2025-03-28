import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProjectComponent } from './pages/project/project.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home - ColossusPM',
    component: IndexComponent,
  },
  {
    path: 'projects/:id',
    title: 'Project',
    component: ProjectComponent,
  },
];
