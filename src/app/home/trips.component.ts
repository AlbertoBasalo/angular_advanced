import { Component, Input } from "@angular/core";
import { Trip } from "../models/trip.interface";

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
    <app-list
      [header]="getHeader()"
      [data]="trips"
      [itemTemplate]="tripListItem"
    ></app-list>
    <ng-template #tripListItem let-context>
      <span [ngClass]="byStatus(context.status)">
        {{ context.destination }}
      </span>
      <span>💸 {{ context.flightPrice | currency }}</span>
      <span>⤴️ {{ context.startDate | date: "yyyy-MMM-dd" }}</span>
      <span>⤵️ {{ context.endDate | date: "yyyy-MMM-dd" }}</span>
      <span [ngClass]="byPlaces(context.places)">🧑🏼‍🚀 {{ context.places }}</span>
      <span *ngIf="context.kind === 'WithStay'">🧳</span>
      <span *ngIf="context.kind === 'TripOnly'">🛰️</span>
    </ng-template>
  `,
})
export class TripsComponent {
  @Input() trips: Trip[] = [];
  getHeader() {
    const header = `📞 Offering ${this.trips.length} trips`;
    console.log("📞 Method call header", header);
    return header;
  }
  byStatus = (status: string) => (status === "Confirmed" ? "green" : "orange");
  byPlaces = (places: number) => {
    if (places === 0) return "sold-out";
    if (places < 8) return "few-places";
    return "";
  };
}
