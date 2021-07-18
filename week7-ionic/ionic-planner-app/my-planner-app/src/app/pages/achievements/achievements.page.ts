import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
})
export class AchievementsPage {

  tasks;//array of all done tasks

  constructor(private service:TaskService) {
  
  }

  ionViewWillEnter(){
    this.service.get_done_tasks().subscribe((result)=>{
      this.tasks=result;
    },(err)=>{
      console.log(err);
    })
  }

}
