import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientSupportPageRoutingModule } from './client-support-routing.module';

import { ClientSupportPage } from './client-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientSupportPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [ClientSupportPage]
})
export class ClientSupportPageModule { }
