import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientRestaurantPageRoutingModule } from './client-restaurant-routing.module';

import { ClientRestaurantPage } from './client-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientRestaurantPageRoutingModule
  ],
  declarations: [ClientRestaurantPage]
})
export class ClientRestaurantPageModule {}
