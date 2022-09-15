import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgenciesViewPage } from "./agencies-view.page";

const routes: Routes = [{ path: "", component: AgenciesViewPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciesViewRoutingModule {}
