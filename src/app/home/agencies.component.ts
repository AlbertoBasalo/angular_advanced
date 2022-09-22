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
      <h3>{{ getHeader() }}</h3>
      <ul>
        <li *ngFor="let agency of agencies">
          <span [ngClass]="byStatus(agency.status)">{{ agency.name }}</span>
          <span *ngIf="agency.range === 'Interplanetary'">🪐</span>
          <span *ngIf="agency.range === 'Orbital'">🌍</span>
        </li>
      </ul>
    </article>
  `,
})
export class AgenciesComponent {
  agencies = data.agencies;
  byStatus = (status: string) => status.toLowerCase();
  getHeader = () => `We work with ${this.agencies.length} agencies`;
}
