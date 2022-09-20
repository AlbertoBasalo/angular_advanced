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
      <span [ngClass]="context.status | lowercase">
        {{ context.name }}
      </span>
      <ng-container
        *ngIf="
          context.range === 'Interplanetary';
          then interplanetary;
          else orbital
        "
      ></ng-container>
    </ng-template>
    <ng-template #interplanetary>🪐</ng-template>
    <ng-template #orbital>🌍</ng-template>
  `,
})
export class AgenciesComponent {
  agencies = data.agencies;
  header = `We work with ${this.agencies.length} agencies`;
}
