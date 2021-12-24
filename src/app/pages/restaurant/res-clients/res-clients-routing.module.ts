import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResClientsPage } from './res-clients.page';

const routes: Routes = [
  {
    path: '',
    component: ResClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResClientsPageRoutingModule {}
