import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Agency } from "../models/agency.interface";

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
    <!-- samples for detecting changes -->
    <h1>{{ getHeader() }}</h1>
    <h1>{{ header }}</h1>
    <h4>{{ agencies | agenciesHeader }}</h4>
    <h3>{{ agenciesHeader }}</h3>
    <button (click)="onClick()">Click me</button>

    <!-- 
      🗑️ Remove comments for real recommended implementation
    <app-list
      [header]="agencies | agenciesHeader"
      [data]="agencies"
      [itemTemplate]="agencyListItem"
    ></app-list> 
    <ng-template #agencyListItem let-context>
      <span [ngClass]="context.status | agencyStatus">{{ context.name }}</span>
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
    -->
  `,
})
export class AgenciesComponent implements OnChanges {
  @Input() agencies: Agency[] = [];

  getHeader() {
    // ⚠️ called on every change, even non related ones, always repaint
    const header = `📞 We work with ${this.agencies.length} agencies`;
    console.log("📞 Method call header", header);
    return header;
  }
  get header() {
    // ⚠️ called on every change, even non related ones, but repaints if changed
    const header = `🏚️ We work with ${this.agencies.length} agencies`;
    console.log("🏚️ property accessor header", header);
    return header;
  }
  agenciesHeader = "";
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["agencies"]) {
      // ⚠️ only whe property is reset from parent component
      this.agenciesHeader = `⚡ We work with ${changes["agencies"].currentValue.length} agencies`;
      console.log("⚡ change header", this.agenciesHeader);
    }
  }

  onClick() {
    console.log("🖱️ event click");
  }
}
