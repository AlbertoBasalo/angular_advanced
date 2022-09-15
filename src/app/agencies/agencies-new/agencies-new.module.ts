import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { AgenciesNewRoutingModule } from "./agencies-new-routing.module";
import { AgenciesNewPage } from "./agencies-new.page";
import { AgenciesNewForm } from './agencies-new.form';

@NgModule({
  declarations: [AgenciesNewPage, AgenciesNewForm],
  imports: [CommonModule, AgenciesNewRoutingModule, SharedModule],
})
export class AgenciesNewModule {}
