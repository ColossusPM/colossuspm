import { Component, Input, OnInit } from '@angular/core';
import { Snowflake } from '@theinternetfolks/snowflake';
import { DatabaseService, Task } from '../../../services/database.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CardModule, CommonModule, FormsModule, DragDropModule, InputTextModule, ButtonModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  @Input() projectId!: string;
  tasks: Task[] = [];
  lanes = [
    { status: 'todo', name: 'To Do' },
    { status: 'in-progress', name: 'In Progress' },
    { status: 'done', name: 'Done' },
  ];
  draggedTask?: Task;
  editTask: Task | null = null;
  newTaskTitle: Record<string, string> = {};
  isDragOver: string | null = null;

  constructor(private _databaseService: DatabaseService) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this._databaseService.getTasksByProject(this.projectId);
  }

  getTasksByStatus(status: string) {
    return this.tasks.filter((task) => task.status === status);
  }

  async createTask(status: string) {
    if (!this.newTaskTitle[status]?.trim()) return;
    const task: Task = {
      id: Snowflake.generate(),
      projectId: this.projectId,
      title: this.newTaskTitle[status].trim(),
      status: status as any,
      createdAt: new Date(),
    };
    await this._databaseService.createTask(task);
    this.newTaskTitle[status] = '';
    await this.loadTasks();
  }

  onDragStart(event: any, task: Task) {
    this.draggedTask = task;
  }

  onDragEnd() {
    this.draggedTask = undefined;
    this.isDragOver = null;
  }

  onDragEnter(status: string) {
    this.isDragOver = status;
  }

  onDragLeave() {
    this.isDragOver = null;
  }

  async onDrop(event: DragEvent, newStatus: string) {
    event.preventDefault();
    if (this.draggedTask && this.draggedTask.status !== newStatus) {
      this.draggedTask.status = newStatus as any;
      await this._databaseService.updateTask(this.draggedTask);
      await this.loadTasks();
      this.draggedTask = undefined;
      this.isDragOver = null;
    }
  }

  edit(task: Task) {
    this.editTask = { ...task };
  }

  async saveEdit() {
    if (this.editTask) {
      await this._databaseService.updateTask(this.editTask);
      this.editTask = null;
      await this.loadTasks();
    }
  }

  cancelEdit() {
    this.editTask = null;
  }

  async deleteTask(task: Task) {
    await this._databaseService.deleteTask(task.id);
    await this.loadTasks();
  }
}
