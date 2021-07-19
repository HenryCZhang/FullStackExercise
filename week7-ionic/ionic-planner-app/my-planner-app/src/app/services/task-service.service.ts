import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskID;
  status;

  constructor(private http:HttpClient) { }

  get_tasks():Observable<Task[]>{
    return this.http.get<Task[]>("http://localhost:1000/task");//link to the workbench backend
  }

  add_task(data){
    return this.http.post("http://localhost:1000/task",data);
  }

  //not sure!!! - for updating the DB status
  check_task(taskId, status){
    return this.http.patch("http://localhost:1000/task/"+taskId, {status}); // {status: status}
  }

  get_done_tasks():Observable<Task[]>{
    return this.http.get<Task[]>("http://localhost:1000/task/filter?status=done");//link to the workbench backend
  }

  delete_task(){
    return this.http.delete("http://localhost:1000/task/"+this.taskID);
  }
}
