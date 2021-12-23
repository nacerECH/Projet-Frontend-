import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantPlatsEditPage } from './restaurant-plats-edit.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantPlatsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantPlatsEditPageRoutingModule {}
