import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Agency } from "../models/agency.interface";
import { ApiService } from "../services/api.service";
@Component({
  selector: "app-agencies",
  template: `
    <article>
      <button (click)="onNewClick()">➕ Add new Agency</button>
      <app-agencies-list
        *ngIf="agencies$ | async as agencies"
        [agencies]="agencies"
      ></app-agencies-list>
    </article>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AgenciesPage {
  agencies$: Observable<Agency[]> = this.api.getAgencies$();

  constructor(private router: Router, private api: ApiService) {}

  onNewClick = () => this.router.navigate(["agencies", "agency", "new"]);
}
