import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientGuard } from './guards/client/client.guard';
import { HomeGuard } from './guards/home.guard';
import { RestaurantGuard } from './guards/restaurant/restaurant.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canLoad: [HomeGuard],

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'client' /**discovery */,
    loadChildren: () => import('./pages/client/discovery/discovery.module').then(m => m.DiscoveryPageModule),
    canLoad: [ClientGuard],
  },

  {
    path: 'restaurant', /**restaurant-dashboard */
    loadChildren: () => import('./pages/restaurant/restaurant-dashboard/restaurant-dashboard.module')
      .then(m => m.RestaurantDashboardPageModule),
    canLoad: [RestaurantGuard],

  }









];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
