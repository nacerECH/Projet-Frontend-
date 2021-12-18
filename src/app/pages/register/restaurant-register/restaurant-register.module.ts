import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantRegisterPageRoutingModule } from './restaurant-register-routing.module';

import { RestaurantRegisterPage } from './restaurant-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantRegisterPageRoutingModule
  ],
  declarations: [RestaurantRegisterPage]
})
export class RestaurantRegisterPageModule {}
