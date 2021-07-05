import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  
  task=[
    { 
    title:'watching the game',
    description:'an important macth',
    date:'04-03-2020',
    time:'1:03:00 AM',
    priority_level:"Low",
    category:"spare time",
    progress_level:"Not Started"
  }
  ]

  constructor() { }
}
