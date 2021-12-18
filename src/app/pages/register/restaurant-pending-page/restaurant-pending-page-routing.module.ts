import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantPendingPagePage } from './restaurant-pending-page.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantPendingPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantPendingPagePageRoutingModule {}
