import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientGuard } from 'src/app/guards/client/client.guard';

import { DiscoveryPage } from './discovery.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoveryPage,
  },
  {
    path: 'client-profile',
    loadChildren: () => import('../client-profile/client-profile.module').then(m => m.ClientProfilePageModule)
  },
  {
    path: 'favorite-restaurants',
    loadChildren: () => import('../favorite-restaurants/favorite-restaurants.module')
      .then(m => m.FavoriteRestaurantsPageModule)
  },
  {
    path: 'client-support',
    loadChildren: () => import('../client-support/client-support.module')
      .then(m => m.ClientSupportPageModule)
  },
  {
    path: 'orders-history',
    loadChildren: () => import('../orders-history/orders-history.module')
      .then(m => m.OrdersHistoryPageModule)
  },
  {
    path: 'nearby',
    loadChildren: () => import('..//nearby/nearby.module').then(m => m.NearbyPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoveryPageRoutingModule { }
