import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatPageRoutingModule } from './plat-routing.module';

import { PlatPage } from './plat.page';
import { ComponentModule } from 'src/app/Components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatPageRoutingModule,
    ComponentModule,
    ReactiveFormsModule
  ],
  declarations: [PlatPage]
})
export class PlatPageModule { }
