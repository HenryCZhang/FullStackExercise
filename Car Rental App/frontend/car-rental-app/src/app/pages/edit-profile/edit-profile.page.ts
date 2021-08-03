import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  current_user;
  phone_number;
  profileForm;

  constructor(private userService:UserService,public toastController: ToastController,private formBuilder: FormBuilder,) {
    this.current_user = userService.get_current_user();

    this.profileForm = formBuilder.group({
      profile_picture: ['', [Validators.required]]
    }); 
  }

  ngOnInit() {
  }

  async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onFileChange(event:any) {  
    const file = event.target.files[0];
    // this.profile_picture = file;

    this.profileForm.patchValue({
      profile_picture: file
    });    
  }

  updatePhoneNumber(){
    //if the phone_number is not null
    if(this.phone_number!=null){
    this.userService.update_lessor_phone_number(this.current_user.id,this.phone_number).subscribe((result)=>{
      console.log(result);
      this.showMessage('Updated phone number successful');
    },(err)=>{
      console.log(err);
      this.showMessage("Err! Failed to update phone number");
    });
    }
  }

  updateProfilePicture(){
    if(this.profileForm.value.profile_picture.name){
      console.log(this.profileForm.value.profile_picture.name);//returns chanel.png
      this.userService.update_lessor_picture(this.current_user.id,this.profileForm.value.profile_picture.name).subscribe((result)=>{
        console.log(result);
        this.showMessage('Updated profile picture successful');
      },(err)=>{
        console.log(err);
        this.showMessage("Err! Failed to update profile picture");
      });
    }
  }

}
