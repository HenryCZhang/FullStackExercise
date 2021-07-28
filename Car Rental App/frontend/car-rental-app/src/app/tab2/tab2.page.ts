import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  current_user;

  constructor(private alertController:AlertController,private userService:UserService) {
     
   }
 
  async confirmDelete(){
    const alert = await this.alertController.create({
      header: '',
      message: 'Are you sure that you want to remove this contact?',
      buttons: ['cancel', 'yes']
    });
    await alert.present();
  }

}
