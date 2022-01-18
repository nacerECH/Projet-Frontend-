import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientMenuPage } from './client-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ClientMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientMenuPageRoutingModule {}
