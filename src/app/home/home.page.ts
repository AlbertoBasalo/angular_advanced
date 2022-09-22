import { ChangeDetectionStrategy, Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <!-- <app-agencies [agencies]="homeData.agencies"></app-agencies> -->
    <app-agencies [agencies]="agencies"></app-agencies>
    <!-- <app-trips></app-trips> -->
    <app-reloading (reload)="onReload()"></app-reloading>
  `,
  styles: [],
})
export class HomePage {
  homeData = data;
  agencies = data.agencies;
  onReload() {
    console.log("reloading");
    // this.homeData.agencies = data.agencies;
    this.agencies = [...data.agencies];
    // this.agencies = data.agencies;
  }
}
