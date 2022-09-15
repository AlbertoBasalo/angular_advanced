import { Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-trips",
  template: `
    <article>
      <h3>Offering {{ getTripsCounter() }} trips</h3>
      <ul>
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
          <ng-container
            *ngIf="trip.kind === 'WithStay'; then withStay; else tripOnly"
          ></ng-container>
          <ng-template #withStay>🧳</ng-template>
          <ng-template #tripOnly>🛰️</ng-template>
        </li>
      </ul>
    </article>
  `,
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
})
export class TripsComponent {
  trips = data.trips;

  getTripsCounter = () => this.trips.length;
  getClassForStatus(status: string): string {
    return status === "Confirmed" ? "green" : "orange";
  }
  getClassForPlaces(places: number): string {
    if (places === 0) return "sold-out";
    if (places < 8) return "few-places";
    return "";
  }
}
