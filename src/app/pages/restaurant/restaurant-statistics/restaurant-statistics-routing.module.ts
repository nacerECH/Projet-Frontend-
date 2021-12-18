import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantStatisticsPage } from './restaurant-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantStatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantStatisticsPageRoutingModule {}
