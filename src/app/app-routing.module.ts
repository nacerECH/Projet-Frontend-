import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'client-register',
    loadChildren: () => import('./pages/register/client-register/client-register.module').then(m => m.ClientRegisterPageModule)
  },
  {
    path: 'restaurant-register',
    loadChildren: () => import('./pages/register/restaurant-register/restaurant-register.module').then(m => m.RestaurantRegisterPageModule)
  },
  {
    path: 'client-profile',
    loadChildren: () => import('./pages/client/client-profile/client-profile.module').then(m => m.ClientProfilePageModule)
  },
  {
    path: 'favorite-restaurants',
    loadChildren: () => import('./pages/client/favorite-restaurants/favorite-restaurants.module').then(m => m.FavoriteRestaurantsPageModule)
  },
  {
    path: 'discovery',
    loadChildren: () => import('./pages/client/discovery/discovery.module').then(m => m.DiscoveryPageModule)
  },
  {
    path: 'client-support',
    loadChildren: () => import('./pages/client/client-support/client-support.module').then(m => m.ClientSupportPageModule)
  },
  {
    path: 'nearby',
    loadChildren: () => import('./pages/client/nearby/nearby.module').then(m => m.NearbyPageModule)
  },
  {
    path: 'orders-history',
    loadChildren: () => import('./pages/client/orders-history/orders-history.module').then(m => m.OrdersHistoryPageModule)
  },
  {
    path: 'restaurant-orders',
    loadChildren: () => import('./pages/restaurant/restaurant-orders/restaurant-orders.module').then(m => m.RestaurantOrdersPageModule)
  },
  {
    path: 'restaurant-support',
    loadChildren: () => import('./pages/restaurant/restaurant-support/restaurant-support.module').then(m => m.RestaurantSupportPageModule)
  },
  {
    path: 'restaurant-dashboard',
    loadChildren: () => import('./pages/restaurant/restaurant-dashboard/restaurant-dashboard.module').then(m => m.RestaurantDashboardPageModule)
  },
  {
    path: 'restaurant-menu',
    loadChildren: () => import('./pages/restaurant/restaurant-menu/restaurant-menu.module').then(m => m.RestaurantMenuPageModule)
  },
  {
    path: 'restaurant-statistics',
    loadChildren: () => import('./pages/restaurant/restaurant-statistics/restaurant-statistics.module').then(m => m.RestaurantStatisticsPageModule)
  },
  {
    path: 'restaurant-profile',
    loadChildren: () => import('./pages/restaurant/restaurant-profile/restaurant-profile.module').then(m => m.RestaurantProfilePageModule)
  },
  {
    path: 'restaurant-reviews',
    loadChildren: () => import('./pages/restaurant/restaurant-reviews/restaurant-reviews.module').then(m => m.RestaurantReviewsPageModule)
  },
  {
    path: 'restaurant-pending-page',
    loadChildren: () => import('./pages/register/restaurant-pending-page/restaurant-pending-page.module').then(m => m.RestaurantPendingPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
