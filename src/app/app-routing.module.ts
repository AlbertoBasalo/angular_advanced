import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutPage } from "./about/about.page";
import { HistoryComponent } from "./about/history.component";
import { MissionComponent } from "./about/mission.component";
import { HomePage } from "./home/home.page";
import { InfoComponent } from "./info.component";

const routes: Routes = [
  {
    path: "",
    title: "Astro Bookings",
    component: HomePage,
  },
  {
    path: ":msg",
    outlet: "info",
    component: InfoComponent,
  },
  {
    path: "about",
    title: "About us",
    data: {
      title: "About us",
    },
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
    data: {
      title: "Contact",
    },
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
  { path: 'trips', loadChildren: () => import('./trips/trips.module').then(m => m.TripsModule) },
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
