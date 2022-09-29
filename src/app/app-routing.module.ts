import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutPage } from "./about/about.page";
import { HistoryComponent } from "./about/history.component";
import { MissionComponent } from "./about/mission.component";
import { HomePage } from "./home/home.page";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
  },
  {
    path: "about",
    component: AboutPage,
    children: [
      {
        path: "history",
        component: HistoryComponent,
      },
      {
        path: "mission",
        component: MissionComponent,
      },
    ],
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./contact/contact.module").then((m) => m.ContactModule),
  },
  {
    path: "auth/register",
    loadChildren: () =>
      import("./auth/register/register.module").then((m) => m.RegisterModule),
  },
  {
    path: "auth/login",
    loadChildren: () =>
      import("./auth/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "agencies",
    loadChildren: () =>
      import("./agencies/agencies.module").then((m) => m.AgenciesModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
