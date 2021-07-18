import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageDiaryPage } from './image-diary.page';

const routes: Routes = [
  {
    path: '',
    component: ImageDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageDiaryPageRoutingModule {}
