import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientRestaurantPage } from './client-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: ClientRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRestaurantPageRoutingModule {}
