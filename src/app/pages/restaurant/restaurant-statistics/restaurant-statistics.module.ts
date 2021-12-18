import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantStatisticsPageRoutingModule } from './restaurant-statistics-routing.module';

import { RestaurantStatisticsPage } from './restaurant-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantStatisticsPageRoutingModule
  ],
  declarations: [RestaurantStatisticsPage]
})
export class RestaurantStatisticsPageModule {}
