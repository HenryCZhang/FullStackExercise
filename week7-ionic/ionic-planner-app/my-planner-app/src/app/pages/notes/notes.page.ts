import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/note';
import { NoteService } from 'src/app/services/note-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  notes:Note[];

  constructor(private noteService:NoteService, public toastController: ToastController){}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.noteService.get_notes().subscribe((result)=>{
      this.notes=result;
    },(err)=>{
      console.log(err);
    });
  }

  async presentToast(task) {
    const toast = await this.toastController.create({
      message: 'This task has been done',
      duration: 2000
    });
    toast.present();
    //TODO: change task status - the databse status is not changed yet
    task.status='done';
  }

  async deletNote(note){
    this.noteService.noteID = note.id; //get the current task id  - the key to success!!!
    this.noteService.delete_note().subscribe((result)=>{
      console.log(result);
    },(err)=>{
      console.log(err);
    })
    const toast = await this.toastController.create({
      message: `Task: ${note.name} has been deleted ~ refresh to see changes`,
      duration: 2000
    });
    note.id=911;
    toast.present();
  }

}
