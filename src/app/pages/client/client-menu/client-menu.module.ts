import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientMenuPageRoutingModule } from './client-menu-routing.module';

import { ClientMenuPage } from './client-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientMenuPageRoutingModule
  ],
  declarations: [ClientMenuPage]
})
export class ClientMenuPageModule {}
