import { Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-home",
  template: `
    <app-agencies [agencies]="homeData.agencies"></app-agencies>
    <app-trips [trips]="homeData.trips"></app-trips>
    <app-reloading></app-reloading>
  `,
  styles: [],
})
export class HomePage {
  homeData = data;
}
