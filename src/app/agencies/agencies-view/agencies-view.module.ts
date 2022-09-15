import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciesViewRoutingModule } from './agencies-view-routing.module';
import { AgenciesViewPage } from './agencies-view.page';


@NgModule({
  declarations: [
    AgenciesViewPage
  ],
  imports: [
    CommonModule,
    AgenciesViewRoutingModule
  ]
})
export class AgenciesViewModule { }
