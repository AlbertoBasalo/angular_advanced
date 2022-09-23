import { Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-list",
  template: `
    <article>
      <h3>{{ header }}</h3>
      <ul *ngIf="data.length > 0; else noContent">
        <li *ngFor="let item of data">
          <ng-container
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"
          ></ng-container>
        </li>
        <ng-content></ng-content>
      </ul>
      <ng-template #noContent>🕳️ No data yet</ng-template>
    </article>
  `,
  styles: [],
})
export class ListComponent {
  @Input() header = "";
  @Input() data: unknown[] = [];
  @Input() public itemTemplate!: TemplateRef<HTMLElement>;
}
