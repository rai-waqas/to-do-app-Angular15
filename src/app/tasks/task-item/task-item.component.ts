import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  isEditClicked = false;
  isCompleted: boolean;
  editIndex: number | null;
  taskForm: FormGroup;
  tasks = [
    {
      name: 'Buy groceries',
      description: 'Buy milk, eggs, and bread from the store',
      dueDate: '2024-07-25',
      priority: 'medium',
      tags: 'shopping,urgent',
      completed: false
    },
    {
      name: 'Finish report',
      description: 'Complete the monthly sales report',
      dueDate: '2024-07-30',
      priority: 'high',
      tags: 'work,important',
      completed: false
    },
    {
      name: 'Call plumber',
      description: 'Fix the leaking sink in the kitchen',
      dueDate: '2024-07-20',
      priority: 'low',
      tags: 'home,maintenance',
      completed: true
    }
  ];
  displayedTasks = this.tasks;
  selectedFilter = 'all';
  selectedTags: string[] = [];
  tags = ['hobby', 'holiday', 'work', 'fun', 'health', 'emergency', 'travel', 'shopping'];
  constructor() {}
  ngOnInit(){
    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      priority: new FormControl('low', Validators.required),
      tags: new FormControl('', Validators.required)
    });
  }

  onFormSubmit() {
    console.log(this.taskForm);
    this.addTask(this.taskForm);
  }
  toggleCompleted(event: Event, task: any) {
    const input = event.target as HTMLInputElement;
    task.completed = input.checked;
    console.log(this.tasks);
  }
  onToggleChange(e: MatButtonToggleChange) {
    console.log('Selected value:', e.value);
    this.selectedTags = e.value;
    switch (e.value) {
      case 'all':
        this.showAll();
        break;
      case 'completed':
        this.showCompleted();
        break;
      case 'priority':
        this.filterByPriority();
        break;
      default:
        break;
    }
  }
  addTask(taskForm: FormGroup) {
    if (taskForm.valid) {
      this.tasks.push({ ...taskForm.value, completed: false });
      taskForm.reset({ priority: 'low' });
      console.log(this.tasks);
    }
  }
  editTask(id) {
    this.taskForm.setValue({
      name: this.tasks[id].name,
      description: this.tasks[id].description,
      dueDate: this.tasks[id].dueDate,
      priority: this.tasks[id].priority,
      tags: this.tasks[id].tags
    });
    this.isEditClicked = true;
    this.isCompleted = this.tasks[id].completed;
    this.editIndex = id;

  }

  updateTask(){
    console.log("Updated Data:", this.taskForm.value);
    if (this.taskForm.valid && this.editIndex !== null) {
    this.tasks[this.editIndex] = this.taskForm.value;
    this.tasks[this.editIndex].completed = this.isCompleted;
    this.displayedTasks = this.tasks;
    this.isEditClicked = false;
    this.editIndex = null;
    this.taskForm.reset({ priority: 'low' });
    console.log("task Updated");
    }
  }

  deleteTask(task: any) {
    if(confirm("Are you sure you want to delete this task?")){
      this.tasks = this.tasks.filter(t=> t !== task);
      this.displayedTasks = this.tasks;
    }
  }
  onTagSelectionChange(event: MatButtonToggleChange) {
    this.selectedTags = event.value;
    console.log('Selected tags:', this.selectedTags);
    this.filterByTags();
  }
  filterByTags() {
    if (this.selectedTags.length === 0) {
      this.displayedTasks = this.tasks;
    } else {
      this.displayedTasks = this.tasks.filter(task =>
        this.selectedTags.some(tag => task.tags.split(',').map(t => t.trim()).includes(tag))
      );
    }
  }

  showAll() {
    this.displayedTasks = this.tasks;
  }

  showCompleted() {
    this.displayedTasks = this.tasks.filter(task => task.completed);
  }

  filterByPriority() {
    // Implement filter by priority functionality
  }
}
