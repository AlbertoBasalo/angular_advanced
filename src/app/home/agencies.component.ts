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
      [header]="getHeader()"
      [data]="agencies"
      [dataTemplate]="agencyListItem"
    ></app-list>
    <ng-template #agencyListItem let-context>
      <span [ngClass]="byStatus(context.status)">{{ context.name }}</span>
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
  byStatus = (status: string) => status.toLowerCase();
  getHeader = () => `We work with ${this.agencies.length} agencies`;
}
