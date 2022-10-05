import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { forkJoin, map, mergeMap, Observable, tap } from "rxjs";
import { Agency } from "../models/agency.interface";
import { Trip } from "../models/trip.interface";
import { ApiService } from "../services/api.service";

@Component({
  template: `
    <h2>Trips for active agencies</h2>
    <h3>Synchronous</h3>
    <h4>Active agencies</h4>
    <pre>{{ agencies | json }}</pre>
    <h4>Trips</h4>
    <pre>{{ trips | json }}</pre>

    <h3>Asynchronous</h3>
    <h4>Active agencies</h4>
    <pre>{{ agencies$ | async | json }}</pre>
    <h4>Trips</h4>
    <pre>{{ trips$ | async | json }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsPage {
  agencies: Agency[] = [];
  trips: Trip[] = [];

  agencies$: Observable<Agency[]> = this.api
    .getAgencies$()
    .pipe(map((allAgencies) => allAgencies.filter(this.byStatusActive)));

  trips$: Observable<Trip[]> = this.agencies$.pipe(
    map((agencies: Agency[]) => this.fromAgenciesToTrips$(agencies)), // * an object array to an array of observables
    tap((requests$: Observable<Trip[]>[]) =>
      console.log("requests$", requests$.length)
    ),
    map((requests$: Observable<Trip[]>[]) => forkJoin(requests$)), // * an array of observables to a single observable
    tap((forkJoin$: Observable<Trip[][]>) =>
      console.log("forkJoin$", forkJoin$)
    ),
    mergeMap((forkJoin$: Observable<Trip[][]>) => forkJoin$), // * an observable to its results
    tap((results: Trip[][]) => console.log("results", results)),
    map((results: Trip[][]) => results.flat()), // * flatten the array of arrays
    tap((allTrips: Trip[]) => console.log("allTrips", allTrips)),
    map((allTrips: Trip[]) => allTrips.filter(this.byStatusConfirmed))
  );

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {
    this.subscribeAndCheck();
  }

  private subscribeAndCheck() {
    this.api.getAgencies$().subscribe((allAgencies) => {
      this.agencies = allAgencies.filter(this.byStatusActive);
      this.cdr.markForCheck();
      this.sendInParallelAndWaitForAll();
    });
  }

  private sendInParallelAndWaitForAll() {
    const tripsRequest$ = this.fromAgenciesToTrips$(this.agencies); // * an object array to an array of observables
    forkJoin(tripsRequest$).subscribe((results) => {
      const allTrips = results.flat(); // * flatten the array of arrays
      this.trips = allTrips.filter(this.byStatusConfirmed);
      this.cdr.markForCheck();
    });
  }

  private byStatusActive(agency: Agency): boolean {
    return agency.status === "Active";
  }
  private fromAgencyToTrips$(agency: Agency): Observable<Trip[]> {
    return this.api.getTripsByAgencyId$(agency.id);
  }
  private fromAgenciesToTrips$(agencies: Agency[]): Observable<Trip[]>[] {
    return agencies.map(this.fromAgencyToTrips$.bind(this));
  }
  private byStatusConfirmed(trip: Trip): boolean {
    return trip.status === "Confirmed";
  }
}
