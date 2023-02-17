import { Component } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {
    this.taskService
    .getTasks()
    .subscribe(
      (tasks)=> {
        this.tasks=tasks});
  }

  deleteTask(task: Task) {
    this.taskService
    .deleteTask(task)
    .subscribe(
      () => {this.tasks = this.tasks.filter((t) => t.taskid !== task.taskid)})
  }

  addTask(task: Task) {
    console.log(task);
    console.log(this.tasks)
    this.taskService.addTask(task).subscribe((task)=>this.tasks.push(task));
    console.log(this.tasks)
  }
}
