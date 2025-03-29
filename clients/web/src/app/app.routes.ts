import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CreateProjectComponent } from './pages/projects/create-project/create-project.component';
import { ProjectSettingsComponent } from './pages/projects/project-settings/project-settings.component';
import { ProjectViewComponent } from './pages/projects/project-view/project-view.component';
import { ViewProjectsComponent } from './pages/view-projects/view-projects.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home - ColossusPM',
    component: IndexComponent,
  },
  {
    path: 'projects',
    title: 'Projects - ColossusPM',
    component: ViewProjectsComponent,
  },
  {
    path: 'projects/create',
    title: 'New Project - ColossusPM',
    component: CreateProjectComponent,
  },
  {
    path: 'projects/:id/view',
    title: 'Project View - ColossusPM',
    component: ProjectViewComponent,
  },
  {
    path: 'projects/:id/settings',
    title: 'Edit Project - ColossusPM',
    component: ProjectSettingsComponent,
  },
];
