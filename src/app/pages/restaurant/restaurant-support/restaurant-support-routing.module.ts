import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantSupportPage } from './restaurant-support.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantSupportPageRoutingModule {}
