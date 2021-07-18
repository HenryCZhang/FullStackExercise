import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoDiaryPage } from './video-diary.page';

const routes: Routes = [
  {
    path: '',
    component: VideoDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoDiaryPageRoutingModule {}
