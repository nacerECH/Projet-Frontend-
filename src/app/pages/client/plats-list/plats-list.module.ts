import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatsListPageRoutingModule } from './plats-list-routing.module';

import { PlatsListPage } from './plats-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatsListPageRoutingModule
  ],
  declarations: [PlatsListPage]
})
export class PlatsListPageModule {}
