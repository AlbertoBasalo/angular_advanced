import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutureRoutingModule } from './future-routing.module';
import { FuturePage } from './future.page';


@NgModule({
  declarations: [
    FuturePage
  ],
  imports: [
    CommonModule,
    FutureRoutingModule
  ]
})
export class FutureModule { }
