import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks/1'

  constructor(private http:HttpClient) { }
  getTasks(): Observable<Task[]>{
    console.log(this.http.get<Task[]>(this.apiUrl))
    return this.http.get<Task[]>(this.apiUrl);
  }
  
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.taskid}`;
    return this.http.delete<Task>(url);
  } 

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, {task:task.task}, httpOptions);
  }
  
}
