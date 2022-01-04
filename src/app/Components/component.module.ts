import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantPopoverComponent } from './restaurant-popover/restaurant-popover.component';
import { ClientPopoverComponent } from './client-popover/client-popover.component';




@NgModule({
  declarations: [
    RestaurantPopoverComponent,
    ClientPopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RestaurantPopoverComponent, ClientPopoverComponent],
})
export class ComponentModule { }
