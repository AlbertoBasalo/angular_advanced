import { Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-home",
  template: `
    <app-agencies [agencies]="dataHome.agencies"></app-agencies>
    <app-trips></app-trips>
    <app-reloading (reload)="onReload()"></app-reloading>
  `,
  styles: [],
})
export class HomePage {
  dataHome = data;
  onReload = () => (this.dataHome = data);
}
