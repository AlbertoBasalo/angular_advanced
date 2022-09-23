import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { data } from "../data.repository";
import { Trip } from "../models/trip.interface";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- <app-agencies [agencies]="homeData.agencies"></app-agencies> -->
    <!-- <app-trips [trips]="trips"></app-trips> -->
    <app-trips *ngIf="trips$ | async as trips" [trips]="trips"></app-trips>
    <app-reloading (reload)="onReload()"></app-reloading>
  `,
  styles: [],
})
export class HomePage {
  homeData = data;
  trips: Trip[] = [];
  trips$!: Observable<Trip[]>;

  constructor(private api: ApiService) {
    // this.subscribe();
    this.useAsyncPipe();
  }

  onReload() {
    console.clear();
    console.log("♻️ reloading");
    this.mutateValue();
    this.subscribe();
  }
  private mutateValue() {
    // ⚠️ undetectable change with OnPush strategies
    this.homeData.agencies = data.agencies;
  }
  private changeReference() {
    // ⚠️ change is detected in all scenarios
    this.homeData.agencies = [...data.agencies];
  }
  private subscribe() {
    this.api.getTrips$().subscribe({ next: (body) => (this.trips = body) });
  }
  private useAsyncPipe() {
    this.trips$ = this.api.getTrips$();
  }
}
