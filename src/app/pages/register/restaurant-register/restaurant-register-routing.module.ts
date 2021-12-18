import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantRegisterPage } from './restaurant-register.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRegisterPageRoutingModule {}
