import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'client-register',
    loadChildren: () => import('../pages/register/client-register/client-register.module').then(m => m.ClientRegisterPageModule)
  },
  {
    path: 'restaurant-register',
    loadChildren: () => import('../pages/register/restaurant-register/restaurant-register.module')
      .then(m => m.RestaurantRegisterPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../pages/register/main-register/main-register.module').then(m => m.MainRegisterPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
