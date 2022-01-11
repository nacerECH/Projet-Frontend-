import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccompagnantPageRoutingModule } from './accompagnant-routing.module';

import { AccompagnantPage } from './accompagnant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccompagnantPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [AccompagnantPage]
})
export class AccompagnantPageModule { }
