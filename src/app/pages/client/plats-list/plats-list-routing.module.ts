import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatsListPage } from './plats-list.page';

const routes: Routes = [
  {
    path: '',
    component: PlatsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatsListPageRoutingModule {}
