import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgenciesNewPage } from "./agencies-new.page";

const routes: Routes = [{ path: "", component: AgenciesNewPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciesNewRoutingModule {}
