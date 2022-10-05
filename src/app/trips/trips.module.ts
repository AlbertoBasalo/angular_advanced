import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsPage } from './trips.page';


@NgModule({
  declarations: [
    TripsPage
  ],
  imports: [
    CommonModule,
    TripsRoutingModule
  ]
})
export class TripsModule { }
