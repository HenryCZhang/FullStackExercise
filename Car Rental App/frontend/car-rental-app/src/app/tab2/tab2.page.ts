import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CarService } from '../services/car-service.service';
import { ContactService } from '../services/contact.service';
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

  constructor(private alertController:AlertController,private toastController: ToastController,private userService:UserService, private carService:CarService, private orderService:OrderService,private contactService:ContactService) {
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

  async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  async deleteOrder(order_id,order_car){
    const alert = await this.alertController.create({
      message: 'Are you sure that you want to delete this order?',
      buttons: [
        {
          text: 'cancel',
        },
        {
          text: 'yes',
          handler: () => {
            this.orderService.delete_order(order_id).subscribe((result)=>{
              console.log(result);
              this.showMessage("Order has been deleted");
            },(err)=>{
              console.log(err);
              this.showMessage("Err! Order could not be deleted");
            });


            //update car rented status
            this.carService.update_rented(order_car.id,order_car.rented).subscribe((result)=>{
              order_car.rented = !order_car.rented;
              console.log(result);
              this.showMessage('Car rented update success');
            },(err)=>{
              console.log(err);
              this.showMessage("Err! Car rented update failed");
            })
          }
        },
      ]
    })
    await alert.present();
  }

  keepContact(contact_id){
    console.log('contact_email: '+contact_id);
    let current_user_email = this.current_user.email;
    console.log('current_user_email: '+ current_user_email);
    this.contactService.update_lessor_email(contact_id,current_user_email).subscribe((result)=>{
      console.log(result);
      this.showMessage('Added contact successful');
    },(err)=>{
      console.log(err);
      this.showMessage("Err! Failed to add contact");
    });
  }

}
