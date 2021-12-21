import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantProfilePageRoutingModule } from './restaurant-profile-routing.module';

import { RestaurantProfilePage } from './restaurant-profile.page';
import { SocialMediaIconsComponentComponent } from 'src/app/social-media-icons-component/social-media-icons-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantProfilePageRoutingModule
  ],
  declarations: [RestaurantProfilePage,SocialMediaIconsComponentComponent]
})
export class RestaurantProfilePageModule {}
