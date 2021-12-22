import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantPlatsDetailsPage } from './restaurant-plats-details.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantPlatsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantPlatsDetailsPageRoutingModule {}
