import { Component } from '@angular/core';
import { FormBuilder,Validators  } from '@angular/forms';
import { CarService } from'../services/car-service.service';
import { Car } from '../interfaces/car';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  current_user
  lessorForm;
  cars:Car[];

  constructor(private builder:FormBuilder, private carService:CarService,private userService:UserService) {
    //get the current user's info
    this.current_user = userService.get_current_user();

     //for the formControlName in html
     this.lessorForm = builder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }

  //get all the cars under this lessor account
  ionViewWillEnter(){
    this.carService.get_car_byLessor(this.current_user.id).subscribe((result)=>{
      this.cars=result;
    },(err)=>{
      console.log(err);
    });
  }

}
