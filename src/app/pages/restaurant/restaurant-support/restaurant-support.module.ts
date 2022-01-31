import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantSupportPageRoutingModule } from './restaurant-support-routing.module';

import { RestaurantSupportPage } from './restaurant-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantSupportPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [RestaurantSupportPage]
})
export class RestaurantSupportPageModule { }
