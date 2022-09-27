import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { data } from "../data.repository";
import { Trip } from "../models/trip.interface";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-agencies [agencies]="homeData.agencies"></app-agencies>
    <app-trips *ngIf="trips$ | async as trips" [trips]="trips"></app-trips>
    <app-reloading (reload)="onReload()"></app-reloading>
  `,
  styles: [],
})
export class HomePage {
  homeData = data;
  trips$!: Observable<Trip[]>;

  constructor(private api: ApiService) {
    this.useAsyncPipe();
  }

  onReload() {
    console.clear();
    console.log("♻️ reloading");
    this.changeReference();
  }

  private changeReference() {
    this.homeData.agencies = data.agencies;
  }

  private useAsyncPipe() {
    this.trips$ = this.api.getTrips$();
  }
}
