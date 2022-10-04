import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { AgenciesPage } from "./agencies.page";

const routes: Routes = [
  {
    path: "",
    component: AgenciesPage,
  },
  {
    path: "agency/new",
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import("./agencies-new/agencies-new.module").then(
        (m) => m.AgenciesNewModule
      ),
  },
  {
    path: "view/:id",
    loadChildren: () =>
      import("./agencies-view/agencies-view.module").then(
        (m) => m.AgenciesViewModule
      ),
  },
  {
    path: ":id/trips",
    component: AgenciesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciesRoutingModule {}
