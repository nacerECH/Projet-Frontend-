import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantPopoverComponent } from './restaurant-popover/restaurant-popover.component';
import { ClientPopoverComponent } from './client-popover/client-popover.component';
import { CommandeAccompagnementComponent } from './commande-accompagnement/commande-accompagnement.component';




@NgModule({
  declarations: [
    RestaurantPopoverComponent,
    ClientPopoverComponent,
    CommandeAccompagnementComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RestaurantPopoverComponent, ClientPopoverComponent, CommandeAccompagnementComponent,
  ],
})
export class ComponentModule { }
