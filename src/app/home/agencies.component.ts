import { Component } from "@angular/core";
import { data } from "../data.repository";

@Component({
  selector: "app-agencies",
  template: `
    <article>
      <h3>We work with {{ agencies.length }} agencies</h3>
      <ul>
        <li *ngFor="let agency of agencies">
          <span [ngClass]="agency.status | lowercase">
            {{ agency.name }}
          </span>
          <span *ngIf="agency.range === 'Interplanetary'">🪐</span>
          <span *ngIf="agency.range === 'Orbital'">🌍</span>
        </li>
      </ul>
    </article>
  `,
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
})
export class AgenciesComponent {
  agencies = data.agencies;
}
