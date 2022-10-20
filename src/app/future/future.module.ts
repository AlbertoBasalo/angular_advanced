import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutureRoutingModule } from './future-routing.module';
import { FuturePage } from './future.page';
import { StoreModule } from '@ngrx/store';
import * as fromFuture from './state';
import { EffectsModule } from '@ngrx/effects';
import { TripsEffects } from './state/trips.effects';


@NgModule({
  declarations: [
    FuturePage
  ],
  imports: [
    CommonModule,
    FutureRoutingModule,
    StoreModule.forFeature(fromFuture.futureFeatureKey, fromFuture.reducers, { metaReducers: fromFuture.metaReducers }),
    EffectsModule.forFeature([TripsEffects])
  ]
})
export class FutureModule { }
