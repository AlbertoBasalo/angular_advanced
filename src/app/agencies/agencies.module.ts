import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciesRoutingModule } from './agencies-routing.module';
import { AgenciesPage } from './agencies.page';
import { AgenciesList } from './agencies.list';
import { AgencyTripsComponent } from './agency-trips.component';


@NgModule({
  declarations: [
    AgenciesPage,
    AgenciesList,
    AgencyTripsComponent
  ],
  imports: [
    CommonModule,
    AgenciesRoutingModule
  ]
})
export class AgenciesModule { }
