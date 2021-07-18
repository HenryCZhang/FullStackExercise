import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGoalsPage } from './add-goals.page';

const routes: Routes = [
  {
    path: '',
    component: AddGoalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGoalsPageRoutingModule {}
