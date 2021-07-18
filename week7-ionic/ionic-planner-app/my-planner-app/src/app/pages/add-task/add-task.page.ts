import { Component, Injectable } from '@angular/core';
import { FormBuilder,Validators  } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
 
export class AddTaskPage{

  taskForm;

  constructor(private taskService:TaskService,public toastController: ToastController,private builder:FormBuilder){
       //for the formControlName in html
       this.taskForm = builder.group({
        name:['',[Validators.required,Validators.required]],
        description:['',[Validators.required]],
        date_of_start:['',[Validators.required]],
        date_of_end:['',[Validators.required]],
        // status:['',[Validators.required]],
      })
   }

  async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onSubmit(){
    console.log(this.taskForm.value);
    this.taskService.add_task(this.taskForm.value).subscribe((result)=>{
      console.log(result);
      this.taskForm.reset();//clear form data
      this.showMessage('Add task successful');
    },(err)=>{
      console.log(err);
      this.showMessage('Err! Add task unsuccessful');
    })
  }


  get nameFormControl(){
    return this.taskForm.get('name');
  }
  get descriptionFormControl(){
    return this.taskForm.get('description');
  }
  get startDateFormControl(){
    return this.taskForm.get('date_of_start');
  }
  get endDateFormControl(){
    return this.taskForm.get('date_of_end');
  }
}
