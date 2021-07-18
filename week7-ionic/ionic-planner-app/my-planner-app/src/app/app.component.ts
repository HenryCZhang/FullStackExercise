import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'To Do List', url: 'to-do-list', icon: 'document-text' },
    { title: 'Add Task', url: 'add-task', icon: 'add-circle' },
    { title: 'Goals', url: 'goals', icon: 'flame' },
    { title: 'Add Goals', url: 'add-goals', icon: 'add-circle' },
    { title: 'Achievements', url: 'achievements', icon: 'ribbon' },
    { title: 'Notes', url: 'notes', icon: 'pricetag' },
    { title: 'Add Notes', url: 'add-notes', icon: 'add-circle' },
    { title: 'Video Diary', url: 'video-diary', icon: 'play-circle' },
    { title: 'Image Diary', url: 'image-diary', icon: 'image' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
