import { Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-trips",
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
    <article>
      <h3>Offering {{ getTripsCounter() }} trips</h3>
      <ul *ngIf="trips.length > 0; else noContent">
        <li *ngFor="let trip of trips">
          <span [ngClass]="getClassForStatus(trip.status)">
            {{ trip.destination }}
          </span>
          <span>💸 {{ trip.flightPrice | currency }}</span>
          <span>⤴️ {{ trip.startDate | date: "yyyy-MMM-dd" }}</span>
          <span>⤵️ {{ trip.endDate | date: "yyyy-MMM-dd" }}</span>
          <span [ngClass]="getClassForPlaces(trip.places)">
            🧑🏼‍🚀 {{ trip.places }}
          </span>
          <span *ngIf="trip.kind === 'WithStay'">🧳</span>
          <span *ngIf="trip.kind === 'TripOnly'">🛰️</span>
        </li>
      </ul>
      <ng-template #noContent>🕳️ No data yet</ng-template>
    </article>
  `,
})
export class TripsComponent {
  trips = data.trips;

  getTripsCounter = () => this.trips.length;
  getClassForStatus = (status: string) =>
    status === "Confirmed" ? "green" : "orange";

  getClassForPlaces(places: number): string {
    if (places === 0) return "sold-out";
    if (places < 8) return "few-places";
    return "";
  }
}
