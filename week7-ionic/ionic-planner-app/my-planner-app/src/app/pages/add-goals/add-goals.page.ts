import { Component } from '@angular/core';
import { FormBuilder,Validators  } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { GoalService } from 'src/app/services/goal.service';

@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.page.html',
  styleUrls: ['./add-goals.page.scss'],
})
export class AddGoalsPage{

  goalForm;

  constructor(private goalService:GoalService,public toastController: ToastController,private builder:FormBuilder){
       //for the formControlName in html
       this.goalForm = builder.group({
        description:['',[Validators.required]],
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
    console.log(this.goalForm.value);
    this.goalService.add_goal(this.goalForm.value).subscribe((result)=>{
      console.log(result);
      this.goalForm.reset();//clear form data
      this.showMessage('Add goal successful');
    },(err)=>{
      console.log(err);
      this.showMessage('Err! Add goal unsuccessful');
    })
  }

  get descriptionFormControl(){
    return this.goalForm.get('description');
  }
}
