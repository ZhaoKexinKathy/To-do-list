import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  task!: string;
  day!:string;
  done:boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
    .onToggle()
    .subscribe(value => this.showAddTask = value)
  }

  onSubmit() {
    if (!this.task) {
      alert('Please add a task');
      return;
    }

    const newTask = {
      task: this.task,
      day: this.day,
      done: this.done
    }
    
    this.onAddTask.emit(newTask)
    this.task = '';
    this.day = '';
    this.done = false;
  }
}
