import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccompagnantPage } from './accompagnant.page';

const routes: Routes = [
  {
    path: '',
    component: AccompagnantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccompagnantPageRoutingModule {}
