import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControladminPage } from './controladmin.page';

const routes: Routes = [
  {
    path: '',
    component: ControladminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControladminPageRoutingModule {}
