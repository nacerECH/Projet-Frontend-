import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientSupportPage } from './client-support.page';

const routes: Routes = [
  {
    path: '',
    component: ClientSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSupportPageRoutingModule {}
