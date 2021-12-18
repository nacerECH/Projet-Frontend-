import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteRestaurantsPageRoutingModule } from './favorite-restaurants-routing.module';

import { FavoriteRestaurantsPage } from './favorite-restaurants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteRestaurantsPageRoutingModule
  ],
  declarations: [FavoriteRestaurantsPage]
})
export class FavoriteRestaurantsPageModule {}
