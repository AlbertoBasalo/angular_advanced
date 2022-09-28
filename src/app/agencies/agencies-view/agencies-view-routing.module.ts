import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgenciesViewPage } from "./agencies-view.page";
import { AgenciesViewResolver } from "./agencies-view.resolver";

const routes: Routes = [
  {
    path: "",
    resolve: {
      agency: AgenciesViewResolver,
    },
    component: AgenciesViewPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciesViewRoutingModule {}
