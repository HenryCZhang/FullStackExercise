import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task-service.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.page.html',
  styleUrls: ['./to-do-list.page.scss'],
})
export class ToDoListPage implements OnInit {

  tasks:Task[];

  constructor(private taskService:TaskService, public toastController: ToastController){}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.taskService.get_tasks().subscribe((result)=>{
      this.tasks=result;
    },(err)=>{
      console.log(err);
    });
  }

  async deletTask(task){
    this.taskService.taskID = task.id; //get the current task id  - the key to success!!!
    this.taskService.delete_task().subscribe((result)=>{
      console.log(result);
    },(err)=>{
      console.log(err);
    })
    task.status='deleted';
    this.taskService.status='deleted';//update DB status
    const toast = await this.toastController.create({
      message: `Task: ${task.name} has been completed ~ refresh to see changes`,
      duration: 2000
    });
    toast.present();
  }
  
}
