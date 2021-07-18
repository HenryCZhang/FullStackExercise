import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goal } from '../interfaces/goal';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  goalID;
  status;

  constructor(private http:HttpClient) { }

  get_goals():Observable<Goal[]>{
    return this.http.get<Goal[]>("http://localhost:1000/goal");//link to the workbench backend
  }

  add_goal(data){
    return this.http.post("http://localhost:1000/goal",data);
  }
  //not sure!!! - for updating the DB status
  check_goal(){
    return this.http.patch("http://localhost:1000/goal/"+this.goalID,this.status);
  }

  get_done_goals():Observable<Goal[]>{
    return this.http.get<Goal[]>("http://localhost:1000/goal/filter?status=done");//link to the workbench backend
  }

  delete_goal(){
    return this.http.delete("http://localhost:1000/goal/"+this.goalID);
  }
}

