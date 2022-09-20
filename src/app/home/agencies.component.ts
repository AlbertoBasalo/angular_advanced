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
    <app-list
      [header]="header"
      [data]="agencies"
      [dataTemplate]="agencyLi"
    ></app-list>
    <ng-template #agencyLi let-context>
      <span [ngClass]="getClassForStatus(context.status)">
        {{ context.name }}
      </span>
      <span *ngIf="context.range === 'Interplanetary'">🪐</span>
      <span *ngIf="context.range === 'Orbital'">🌍</span>
    </ng-template>
  `,
})
export class AgenciesComponent {
  agencies = data.agencies;
  header = `We work with ${this.agencies.length} agencies`;
  getAgenciesCounter = () => this.agencies.length;
  getClassForStatus = (status: string) => status.toLowerCase();
}
