import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientRegisterPageRoutingModule } from './client-register-routing.module';

import { ClientRegisterPage } from './client-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientRegisterPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [ClientRegisterPage]
})
export class ClientRegisterPageModule { }
