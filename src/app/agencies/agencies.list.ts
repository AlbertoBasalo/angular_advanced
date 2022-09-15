import { Component, Input, OnInit } from "@angular/core";
import { Agency } from "../models/agency.interface";

@Component({
  selector: "app-agencies-list",
  template: `
    <ul>
      <li *ngFor="let agency of agencies">
        <a [routerLink]="agency.id">{{ agency.name }}</a>
      </li>
    </ul>
  `,
  styles: [],
})
export class AgenciesList implements OnInit {
  @Input() agencies: Agency[] = [];
  constructor() {}

  ngOnInit(): void {}
}
