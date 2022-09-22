import { ChangeDetectionStrategy, Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-trips",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .green {
        color: green;
      }
      .orange {
        color: orange;
      }
      .sold-out {
        color: red;
      }
      .few-places {
        color: orange;
      }
    `,
  ],
  template: `
    <app-reloading (reload)="onReload()"></app-reloading>
    <article>
      <h3>{{ header }}</h3>
      <h4>{{ getHeader() }}</h4>
      <h4>{{ header | uppercase }}</h4>
      <ul *ngIf="trips.length > 0">
        <li *ngFor="let trip of trips">
          <span [ngClass]="byStatus(trip.status)">{{ trip.destination }}</span>
          <span>💸 {{ trip.flightPrice | currency }}</span>
          <span>⤴️ {{ trip.startDate | date: "yyyy-MMM-dd" }}</span>
          <span>⤵️ {{ trip.endDate | date: "yyyy-MMM-dd" }}</span>
          <span [ngClass]="byPlaces(trip.places)">🧑🏼‍🚀 {{ trip.places }}</span>
          <span *ngIf="trip.kind === 'WithStay'">🧳</span>
          <span *ngIf="trip.kind === 'TripOnly'">🛰️</span>
        </li>
      </ul>
      <span *ngIf="trips.length <= 0">🕳️ No data yet</span>
    </article>
  `,
})
export class TripsComponent {
  trips = data.trips;
  get header() {
    const header = `Offering ${this.trips.length} trips`;
    console.log("property", header);
    return header;
  }
  getHeader() {
    const header = `Offering ${this.trips.length} trips`;
    console.log("method", header);
    return header;
  }
  byStatus = (status: string) => (status === "Confirmed" ? "green" : "orange");
  byPlaces = (places: number) => {
    // console.log("places", places);
    if (places === 0) return "sold-out";
    if (places < 8) return "few-places";
    return "";
  };
  onReload() {
    this.trips = data.trips;
  }
}
