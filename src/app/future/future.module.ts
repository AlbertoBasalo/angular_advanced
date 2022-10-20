import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutureRoutingModule } from './future-routing.module';
import { FuturePage } from './future.page';
import { StoreModule } from '@ngrx/store';
import * as fromFuture from './state';


@NgModule({
  declarations: [
    FuturePage
  ],
  imports: [
    CommonModule,
    FutureRoutingModule,
    StoreModule.forFeature(fromFuture.futureFeatureKey, fromFuture.reducers, { metaReducers: fromFuture.metaReducers })
  ]
})
export class FutureModule { }
