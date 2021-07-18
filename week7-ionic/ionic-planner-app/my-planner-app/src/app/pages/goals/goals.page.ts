import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/interfaces/goal';
import { ToastController } from '@ionic/angular';
import { GoalService } from 'src/app/services/goal.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {

  goals:Goal[];

  constructor(private goalService:GoalService, public toastController: ToastController){}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.goalService.get_goals().subscribe((result)=>{
      this.goals=result;
    },(err)=>{
      console.log(err);
    });
  }

  async deleteGoal(goal){
    this.goalService.goalID = goal.id; //get the current goal id  - the key to success!!!
    this.goalService.delete_goal().subscribe((result)=>{
      console.log(result);
    },(err)=>{
      console.log(err);
    })
    goal.status='done';
    this.goalService.status='done';//update DB status
    const toast = await this.toastController.create({
      message: `This goal has been completed ~ refresh to see changes`,
      duration: 2000
    });
    toast.present();
  }
  
}
