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
    <!-- ⚠️ undetectable change with OnPush strategies -->
    <app-trips [trips]="trips"></app-trips>
    <!-- 
      ⚠️ change is detected in all scenarios because async pip fires change detection
      <app-trips *ngIf="trips$ | async as trips" [trips]="trips"></app-trips> 
    -->
    <app-reloading (reload)="onReload()"></app-reloading>
  `,
  styles: [],
})
export class HomePage {
  homeData = data; // to be used as object.property
  trips: Trip[] = []; // to be used directly
  trips$!: Observable<Trip[]>; // to be used with | async pipe

  constructor(private api: ApiService) {
    // this.refreshWithDefaultOnly();
    this.refreshWithOnPush();
  }

  onReload() {
    console.clear();
    console.log("♻️ reloading");
    // this.refreshWithDefaultOnly();
    this.refreshWithOnPush();
  }

  private refreshWithDefaultOnly() {
    this.mutateValue();
    this.subscribe();
  }
  private refreshWithOnPush() {
    this.changeReference();
    this.useAsyncPipe();
  }

  private mutateValue() {
    // ⚠️ undetectable change with OnPush strategies, because agencies points to the SAME reference
    this.homeData.agencies = data.agencies;
  }
  private changeReference() {
    // ⚠️ change is detected in all scenarios, because agencies is a NEW reference
    this.homeData.agencies = [...data.agencies];
  }
  private subscribe() {
    // ⚠️ undetectable change with OnPush strategies
    this.api.getTrips$().subscribe({ next: (body) => (this.trips = body) });
  }
  private useAsyncPipe() {
    // ⚠️ the async pip fires change detection loop
    this.trips$ = this.api.getTrips$();
  }
}
