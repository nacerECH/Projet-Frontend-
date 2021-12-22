import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantPlatsDetailsPageRoutingModule } from './restaurant-plats-details-routing.module';

import { RestaurantPlatsDetailsPage } from './restaurant-plats-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantPlatsDetailsPageRoutingModule
  ],
  declarations: [RestaurantPlatsDetailsPage]
})
export class RestaurantPlatsDetailsPageModule {}
