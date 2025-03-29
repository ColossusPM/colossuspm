import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
  deadline?: Date; // Added deadline field
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  projects!: Table<Project, string>;
  tasks!: Table<Task, string>;

  constructor() {
    super('colossuspm');

    this.version(3).stores({
      // Increment version
      projects: 'id, name, createdAt',
      tasks: 'id, projectId, title, status, createdAt, deadline', // Added deadline to index
    });

    this.projects = this.table('projects');
    this.tasks = this.table('tasks');
  }

  async createProject(project: Project): Promise<void> {
    await this.projects.add(project);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async updateProject(project: Project): Promise<void> {
    await this.projects.put(project);
  }

  async deleteProject(id: string): Promise<void> {
    await this.projects.delete(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projects.toArray();
  }

  async createTask(task: Task): Promise<void> {
    await this.tasks.add(task);
  }

  async getTasksByProject(projectId: string): Promise<Task[]> {
    return this.tasks.where('projectId').equals(projectId).toArray();
  }

  async updateTask(task: Task): Promise<void> {
    await this.tasks.put(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.tasks.delete(id);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks.toArray();
  }
}
