import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService{

  noteID;

  constructor(private http:HttpClient) { }

  get_notes():Observable<Note[]>{
    return this.http.get<Note[]>("http://localhost:1000/note");//link to the workbench backend
  }

  add_note(data){
    return this.http.post("http://localhost:1000/note",data);
  }

  delete_note(){
    return this.http.delete("http://localhost:1000/note/"+this.noteID);
  }
}
