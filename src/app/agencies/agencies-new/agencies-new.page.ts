import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Agency } from "src/app/models/agency.interface";
import { AgenciesNewService } from "./agencies-new.service";

@Component({
  selector: "app-agencies-new",
  template: `
    <h2>➕ Create a new agency record</h2>
    <app-agencies-new-form (save)="onSave($event)"></app-agencies-new-form>
  `,
  styles: [],
})
export class AgenciesNewPage {
  constructor(
    private agenciesNew: AgenciesNewService,
    private router: Router
  ) {}

  onSave(formValue: Omit<Agency, "id">) {
    this.agenciesNew.saveAgency(formValue).subscribe({
      next: (body) => this.router.navigate(["agencies"]),
    });
  }
}
