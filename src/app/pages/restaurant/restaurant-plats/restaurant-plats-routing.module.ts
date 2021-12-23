import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantPlatsPage } from './restaurant-plats.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantPlatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantPlatsPageRoutingModule {}
