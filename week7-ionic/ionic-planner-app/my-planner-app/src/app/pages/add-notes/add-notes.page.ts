import { Component, Injectable } from '@angular/core';
import { FormBuilder,Validators  } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note-service.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.page.html',
  styleUrls: ['./add-notes.page.scss'],
})
export class AddNotesPage{

  noteForm;

  constructor(private noteService:NoteService, public toastController: ToastController,private builder:FormBuilder){
       //for the formControlName in html
       this.noteForm = builder.group({
        name:['',[Validators.required,Validators.required]],
        header:['',[Validators.required]],
        details:['',[Validators.required]],
        importance:['',[Validators.required]],
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
    console.log(this.noteForm.value);
    this.noteService.add_note(this.noteForm.value).subscribe((result)=>{
      console.log(result);
      this.noteForm.reset();//clear form data
      this.showMessage('Add note successful');
    },(err)=>{
      console.log(err);
      this.showMessage('Err! Add note unsuccessful');
    })
  }

  get nameFormControl(){
    return this.noteForm.get('name');
  }
  get headerFormControl(){
    return this.noteForm.get('header');
  }
  get detailsFormControl(){
    return this.noteForm.get('details');
  }
  get importanceFormControl(){
    return this.noteForm.get('importance');
  }

}
