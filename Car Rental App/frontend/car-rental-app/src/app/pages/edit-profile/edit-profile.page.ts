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
      // phone_number: ['', [Validators.required]],
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
      console.log(this.phone_number);//returns the correct phone number
      let formData  = new FormData();
      formData.append("phone_number", this.phone_number);
      this.userService.update_lessor_phone_number(this.current_user.id,formData).subscribe((result)=>{
        this.userService.updatePhoneNumber(this.phone_number);//todo
        console.log(result);
        this.showMessage('Updated phone number successful');
      },(err)=>{
        console.log(err);
        this.showMessage("Err! Failed to update phone number");
      });
    }else{
      console.log('this.profileForm.value.phone_number.name is empty');
      console.log(this.phone_number);
    }
  }

  updateProfilePicture(){
    if(this.profileForm.value.profile_picture.name){
      let formData  = new FormData();
      formData.append("profile_picture", this.profileForm.value.profile_picture);
      this.userService.update_lessor_picture(this.current_user.id,formData).subscribe((result)=>{
        this.userService.updateProfilePicture(this.profileForm.value.profile_picture.name);
        this.showMessage('Updated profile picture successful');
      },(err)=>{
        console.log(err);
        this.showMessage("Err! Failed to update profile picture");
      });
    }
  }

}
