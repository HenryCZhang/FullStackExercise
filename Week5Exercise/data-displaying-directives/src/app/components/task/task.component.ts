import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task:any[];

  constructor(private taskService:TaskService) { 
    this.task=taskService.task;
  }

  ngOnInit(): void {
  }

}
