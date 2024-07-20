import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  taskForm: FormGroup;
  tasks: any = [];

  constructor() {
    this.taskForm = new FormGroup({
      banner: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      priority: new FormControl('medium', Validators.required),
      tags: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.tasks.push({ ...this.taskForm.value, completed: false });
      this.taskForm.reset({ priority: 'medium' });
    }
  }

  toggleCompleted(task: any) {
    task.completed = !task.completed;
  }

  editTask(task: any) {
    // Implement edit functionality
  }

  deleteTask(task: any) {
    // this.tasks = this.tasks.filter(t=> t !== task);
  }

  filterByTags() {
    // Implement filter by tags functionality
  }

  showAll() {
    // Implement show all functionality
  }

  showCompleted() {
    // Implement show completed functionality
  }

  filterByPriority() {
    // Implement filter by priority functionality
  }
}
