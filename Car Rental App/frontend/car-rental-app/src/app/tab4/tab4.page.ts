import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  current_user;
  loginActivated:boolean=false;

  constructor(private userService:UserService,public toastController: ToastController, private alertController:AlertController, private router:Router) {
    this.current_user = userService.get_current_user();
  }

  async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
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
            this.router.navigate(['/login']);//app-routing.module
          }
        },
      ]
    });
    await alert.present();
  }
}
