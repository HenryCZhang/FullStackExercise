import { Component } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { CarService } from'../services/car-service.service';
import { Car } from '../interfaces/car';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  cars:Car[];
  toggled=false;

  constructor(private menu: MenuController, private carService:CarService,private userService:UserService,public toastController: ToastController, private alertController:AlertController) { }

  //get all the cars in the DB
  ionViewWillEnter(){
    this.carService.get_car().subscribe((result)=>{
      this.cars=result;
    },(err)=>{
      console.log(err);
    });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  toggleCarDetails(car){
    car.toggled = !car.toggled;
  }

  async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async logout(){
    const alert = await this.alertController.create({
      message: 'Are you sure that you want to log out?',
      buttons: [
        {
          text: 'cancel',
        },
        {
          text: 'yes',
          handler: () => {
            this.userService.logout();
            this.showMessage("You are logged out");
          }
        },
      ]
    });
    await alert.present();
  }

}

