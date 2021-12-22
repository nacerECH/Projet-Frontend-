import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainRegisterPage } from './main-register.page';

const routes: Routes = [
  {
    path: '',
    component: MainRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRegisterPageRoutingModule {}
