import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesDiaryPage } from './images-diary.page';

const routes: Routes = [
  {
    path: '',
    component: ImagesDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesDiaryPageRoutingModule {}
