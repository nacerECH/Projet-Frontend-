import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantDashboardPage } from './restaurant-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantDashboardPage,
  },
  {
    path: 'orders',
    loadChildren: () => import('../restaurant-orders/restaurant-orders.module')
      .then(m => m.RestaurantOrdersPageModule)
  },
  {
    path: 'restaurant-support',
    loadChildren: () => import('../restaurant-support/restaurant-support.module')
      .then(m => m.RestaurantSupportPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('../restaurant-menu/restaurant-menu.module')
      .then(m => m.RestaurantMenuPageModule)
  },
  {
    path: 'plats',
    loadChildren: () => import('../restaurant-plats/restaurant-plats.module')
      .then(m => m.RestaurantPlatsPageModule)
  },
  {
    path: 'plats-details',
    loadChildren: () => import('../restaurant-plats-details/restaurant-plats-details.module')
      .then(m => m.RestaurantPlatsDetailsPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('../restaurant-statistics/restaurant-statistics.module')
      .then(m => m.RestaurantStatisticsPageModule)
  },
  {
    path: 'restaurant-profile',
    loadChildren: () => import('../restaurant-profile/restaurant-profile.module')
      .then(m => m.RestaurantProfilePageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('../restaurant-reviews/restaurant-reviews.module')
      .then(m => m.RestaurantReviewsPageModule)
  },
  {
    path: 'pending-page',
    loadChildren: () => import('../../register/restaurant-pending-page/restaurant-pending-page.module')
      .then(m => m.RestaurantPendingPagePageModule)
  },
  {
    path: 'restaurant-plats-edit',
    loadChildren: () => import('../../restaurant/restaurant-plats-edit/restaurant-plats-edit.module')
    .then( m => m.RestaurantPlatsEditPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantDashboardPageRoutingModule { }
