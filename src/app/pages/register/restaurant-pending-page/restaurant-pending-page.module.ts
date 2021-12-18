import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantPendingPagePageRoutingModule } from './restaurant-pending-page-routing.module';

import { RestaurantPendingPagePage } from './restaurant-pending-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantPendingPagePageRoutingModule
  ],
  declarations: [RestaurantPendingPagePage]
})
export class RestaurantPendingPagePageModule {}
