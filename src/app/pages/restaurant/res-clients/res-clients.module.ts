import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResClientsPageRoutingModule } from './res-clients-routing.module';

import { ResClientsPage } from './res-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResClientsPageRoutingModule
  ],
  declarations: [ResClientsPage]
})
export class ResClientsPageModule {}
