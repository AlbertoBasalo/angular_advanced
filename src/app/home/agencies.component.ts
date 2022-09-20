import { Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-agencies",
  styles: [
    `
      .active {
        font-style: normal;
        font-weight: bold;
      }
      .pending {
        font-style: italic;
      }
    `,
  ],
  template: `
    <article>
      <h3>We work with {{ agencies.length }} agencies</h3>
      <ul>
        <li *ngFor="let agency of agencies">
          <span [ngClass]="getClassForStatus(agency.status)">
            {{ agency.name }}
          </span>
          <span *ngIf="agency.range === 'Interplanetary'">🪐</span>
          <span *ngIf="agency.range === 'Orbital'">🌍</span>
        </li>
      </ul>
    </article>
  `,
})
export class AgenciesComponent {
  agencies = data.agencies;
  getAgenciesCounter = () => this.agencies.length;
  getClassForStatus = (status: string) => status.toLowerCase();
}
