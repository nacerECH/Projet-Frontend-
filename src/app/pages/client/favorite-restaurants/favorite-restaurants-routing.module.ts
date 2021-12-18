import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteRestaurantsPage } from './favorite-restaurants.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteRestaurantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteRestaurantsPageRoutingModule {}
