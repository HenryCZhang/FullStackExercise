import { Component, OnInit } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { TaskService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
})
export class AchievementsPage {

  tasks;//array of all completed tasks
  goals;//array of all completed goals

  constructor(private taskService:TaskService,private goalService:GoalService) {
  }

  ionViewWillEnter(){
    this.taskService.get_done_tasks().subscribe((result)=>{
      this.tasks=result;
    },(err)=>{
      console.log(err);
    })

    this.goalService.get_done_goals().subscribe((result)=>{
      this.goals=result;
    },(err)=>{
      console.log(err);
    })
  }

}
