import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoDiaryPageRoutingModule } from './video-diary-routing.module';

import { VideoDiaryPage } from './video-diary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoDiaryPageRoutingModule
  ],
  declarations: [VideoDiaryPage]
})
export class VideoDiaryPageModule {}
