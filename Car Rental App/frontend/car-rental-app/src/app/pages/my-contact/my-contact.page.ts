import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-contact',
  templateUrl: './my-contact.page.html',
  styleUrls: ['./my-contact.page.scss'],
})
export class MyContactPage implements OnInit {

  constructor(private alertController:AlertController) { }

  ngOnInit() {
  }

  async confirmDelete(){
    const alert = await this.alertController.create({
      header: '',
      message: 'Are you sure that you want to delete this contact?',
      buttons: ['cancel', 'yes']
    });
    await alert.present();
  }

}
