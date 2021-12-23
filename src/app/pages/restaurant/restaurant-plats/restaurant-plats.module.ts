import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantPlatsPageRoutingModule } from './restaurant-plats-routing.module';

import { RestaurantPlatsPage } from './restaurant-plats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantPlatsPageRoutingModule
  ],
  declarations: [RestaurantPlatsPage]
})
export class RestaurantPlatsPageModule {}
