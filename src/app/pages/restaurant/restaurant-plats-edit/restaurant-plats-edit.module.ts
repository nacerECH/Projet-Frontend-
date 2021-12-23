import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantPlatsEditPageRoutingModule } from './restaurant-plats-edit-routing.module';

import { RestaurantPlatsEditPage } from './restaurant-plats-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantPlatsEditPageRoutingModule
  ],
  declarations: [RestaurantPlatsEditPage]
})
export class RestaurantPlatsEditPageModule {}
