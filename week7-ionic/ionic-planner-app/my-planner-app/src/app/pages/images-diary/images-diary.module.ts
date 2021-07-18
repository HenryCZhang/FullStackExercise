import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagesDiaryPageRoutingModule } from './images-diary-routing.module';

import { ImagesDiaryPage } from './images-diary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesDiaryPageRoutingModule
  ],
  declarations: [ImagesDiaryPage]
})
export class ImagesDiaryPageModule {}
