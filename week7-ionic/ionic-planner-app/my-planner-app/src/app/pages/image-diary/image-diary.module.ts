import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageDiaryPageRoutingModule } from './image-diary-routing.module';

import { ImageDiaryPage } from './image-diary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageDiaryPageRoutingModule
  ],
  declarations: [ImageDiaryPage]
})
export class ImageDiaryPageModule {}
