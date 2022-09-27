import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotDirtyGuard } from "src/app/shared/not-dirty.guard";
import { LoginPage } from "./login.page";

const routes: Routes = [
  { path: "", canDeactivate: [NotDirtyGuard], component: LoginPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
