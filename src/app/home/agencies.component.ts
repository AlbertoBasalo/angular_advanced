import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-agencies",
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    <button (click)="onClick()">click me</button>
    <app-list
      [header]="header"
      [data]="agencies"
      [dataTemplate]="agencyListItem"
    ></app-list>
    <app-list
      [header]="agencies | agenciesHeader"
      [data]="agencies"
      [dataTemplate]="agencyListItem"
    ></app-list>
    <app-list
      [header]="agenciesHeader"
      [data]="agencies"
      [dataTemplate]="agencyListItem"
    ></app-list>
    <ng-template #agencyListItem let-context>
      <span [ngClass]="byStatus(context.status)">{{ context.name }}</span>
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
  `,
})
export class AgenciesComponent implements OnChanges {
  @Input() agencies: any[] = [];
  byStatus(status: string) {
    console.log("👩🏼‍🏭 function status", status);
    return status.toLowerCase();
  }
  get header() {
    const header = `We work with ${this.agencies.length} agencies`;
    // console.log("🏚️ property header", header);
    return header;
  }
  agenciesHeader = "";
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["agencies"]) {
      this.agenciesHeader = `We work with ${changes["agencies"].currentValue.length} agencies`;
      console.log("⚡change", this.agenciesHeader);
    }
  }
  onClick() {
    console.log("click");
  }
}
