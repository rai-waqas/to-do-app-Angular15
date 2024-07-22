import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/taskService/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  isEditClicked = false;
  isCompleted: boolean;
  editIndex: number | null;
  taskId: number | null;
  taskForm: FormGroup;
  tasks: any[] = [];
  displayedTasks: any[] = [];
  selectedFilter = 'all';
  selectedTags: string[] = [];
  selectedPriority: string[] = [];
  tags = ['hobby', 'holiday', 'work', 'fun', 'health', 'emergency', 'travel', 'shopping'];
  priority = ['low', 'medium', 'high'];

  constructor(private taskService: TaskService, private authService: AuthService) {}
  ngOnInit(){
    this.taskForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      priority: new FormControl('low', Validators.required),
      tags: new FormControl('', Validators.required)
    });
    this.loadTasks();
  }

  loadTasks() {
    this.authService.getUserId().subscribe(userId => {
      try{
      this.taskService.getTasksByUserId().subscribe(
        tasks => {
          this.tasks = tasks;
          console.log('Tasks:', tasks);
          this.displayedTasks = tasks;
        },
        error => { }
      );
    } catch (error) {}
    });
  }

  onFormSubmit() {
    if (this.taskForm.valid) {
        this.authService.getUserId().subscribe(userId => {
            if (userId === null) {
                console.error('User not authenticated');
                return;
            }

            const formValue = this.taskForm.value;
            const dueDate = new Date(formValue.dueDate);
            dueDate.setUTCHours(0, 0, 0, 0);

            const newTask = {
                ...formValue,
                dueDate: dueDate.toISOString(),
                completed: false,
                userId: userId
            };

            this.taskService.createTask(newTask).subscribe(
                response => {
                    this.tasks.push({ ...newTask, completed: false });
                    this.displayedTasks = this.tasks;
                    this.taskForm.reset({ priority: 'low' });
                    console.log('Task added:', response);
                },
                error => {
                    console.error('Error adding task:', error);
                }
            );
        });
    }
}


  toggleCompleted(event: Event, task: any) {
    const input = event.target as HTMLInputElement;
    task.completed = input.checked;
    task.dueDate = new Date(task.dueDate).toISOString();
    this.taskService.updateTask(task.id, task).subscribe(
      (response) => {
        console.log('Task updated:', response);
        console.log(this.tasks);
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
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
      default:
        break;
    }
  }
  editTask(id: number) {
    const task = this.tasks[id];
    const dueDate = new Date(task.dueDate).toISOString().split('T')[0];
    
    this.taskForm.setValue({
      id: task.id,
      name: task.name,
      description: task.description,
      dueDate: dueDate,
      priority: task.priority,
      tags: task.tags
    });
    this.taskId = task.id;
    this.isEditClicked = true;
    this.isCompleted = task.completed;
    this.editIndex = id;
  }

  updateTask(){
    if (this.taskForm.valid && this.editIndex !== null) {
      const formValues = this.taskForm.value;
      const updatedTask = { 
        ...formValues,
        completed: this.isCompleted,
        id: this.taskId,
        dueDate: new Date(formValues.dueDate).toISOString()
      };
      console.log('Updated task:', updatedTask);
      this.taskService.updateTask(updatedTask.id, updatedTask).subscribe(
        (response) => {
          this.taskId = null;
          if (response == null){
            // console.log('Index:', this.editIndex);
          if (this.editIndex !== -1) {
            this.tasks[this.editIndex] = updatedTask;
            this.displayedTasks = [...this.tasks];
            this.isEditClicked = false;
            this.editIndex = null;
            this.taskForm.reset({ priority: 'low' });
            console.log('Task updated:');
          }
          }
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }
  }

  deleteTask(task: any) {
    if (confirm("Are you sure you want to delete this task?")) {
      this.taskService.deleteTask(task.id).subscribe(
        () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          this.displayedTasks = this.tasks;
          console.log('Task deleted:', task.id);
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
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

  onPrioritySelectionChange(event: MatButtonToggleChange) {
    this.selectedPriority = event.value;
    console.log('Selected Priority:', this.selectedPriority);
    this.filterByPriority();
  }

  showAll() {
    this.displayedTasks = this.tasks;
  }

  showCompleted() {
    this.displayedTasks = this.tasks.filter(task => task.completed);
  }

  filterByPriority() {
    if (this.selectedPriority.length === 0) {
      this.displayedTasks = this.tasks;
    } else {
      this.displayedTasks = this.tasks.filter(task =>
        this.selectedPriority.some(priority => task.priority.split(',').map(t => t.trim()).includes(priority))
      );
    }
  }
}
