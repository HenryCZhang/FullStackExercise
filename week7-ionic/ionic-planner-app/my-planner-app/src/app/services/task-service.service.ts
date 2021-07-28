import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  // get_tasks():Observable<Task[]>{
  //   return this.http.get<Task[]>("http://localhost:1000/task");//link to the workbench backend
  // }

  // add_task(data){
  //   return this.http.post("http://localhost:1000/task",data);
  // }

  // // not sure!!! - for updating the DB status
  // check_task(taskId, status){
  //   return this.http.patch("http://localhost:1000/task/"+taskId, {status});
  // }

  // get_done_tasks():Observable<Task[]>{
  //   return this.http.get<Task[]>("http://localhost:1000/task/filter?status=done");//link to the workbench backend
  // }

  // delete_task(taskID){
  //   return this.http.delete("http://localhost:1000/task/"+taskID);
  // }

  //Heroku
  get_tasks():Observable<Task[]>{
    return this.http.get<Task[]>("https://to-do-list-200.herokuapp.com/");//link to the workbench backend
  }

  add_task(data){
    return this.http.post("https://to-do-list-200.herokuapp.com/task",data);
  }

  //not sure!!! - for updating the DB status
  check_task(taskId, status){
    return this.http.patch("https://to-do-list-200.herokuapp.com/task/"+taskId, {status});
  }

  get_done_tasks():Observable<Task[]>{
    return this.http.get<Task[]>("https://to-do-list-200.herokuapp.com/task/filter?status=done");//link to the workbench backend
  }

  delete_task(taskID){
    return this.http.delete("https://to-do-list-200.herokuapp.com/task/"+taskID);
  }
}
