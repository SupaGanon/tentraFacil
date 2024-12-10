import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControladminPageRoutingModule } from './controladmin-routing.module';

import { ControladminPage } from './controladmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControladminPageRoutingModule
  ],
  declarations: [ControladminPage]
})
export class ControladminPageModule {}
