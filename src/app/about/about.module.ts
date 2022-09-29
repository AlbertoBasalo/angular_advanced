import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AboutPage } from "./about.page";
import { MissionComponent } from './mission.component';

@NgModule({
  declarations: [AboutPage, MissionComponent],
  imports: [CommonModule, RouterModule],
})
export class AboutModule {}
