import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CarService } from '../services/car-service.service';
import { OrderService } from '../services/order-service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  current_user;
  car;
  orders; 
  constructor(private alertController:AlertController,private userService:UserService, private carService:CarService, private orderService:OrderService) {
    this.current_user = userService.get_current_user();
   }
 
  async confirmDelete(){
    const alert = await this.alertController.create({
      header: '',
      message: 'Are you sure that you want to remove this contact?',
      buttons: ['cancel', 'yes']
    });
    await alert.present();
  }

  //get all the orders under the current user account
  ionViewWillEnter(){
    this.orderService.get_order_byUser(this.current_user.email).subscribe((result)=>{
      this.orders=result;
    },(err)=>{
      console.log(err);
    });
  }
   //get the car in the order -> to display car info in the order 
  getCarByOrder(order){
    this.carService.get_car_byOrder(order.car_id).subscribe((result)=>{
      this.car=result;
    },(err)=>{
      console.log(err);
    });
  }

}
