import { Component, Input } from "@angular/core";
import { Agency } from "../models/agency.interface";

@Component({
  selector: "app-agencies-list",
  template: `
    <ul>
      <li *ngFor="let agency of agencies">
        <p>
          <a [routerLink]="['view', agency.id]">Visit : {{ agency.name }}</a>
        </p>
        <p><a [routerLink]="[agency.id, 'trips']">View Trips</a></p>
      </li>
    </ul>
  `,
  styles: [],
})
export class AgenciesList {
  @Input() agencies: Agency[] = [];
}
