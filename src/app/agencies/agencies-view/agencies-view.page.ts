import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Agency } from "src/app/models/agency.interface";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-agencies-view",
  template: `
    <article>
      <h2>{{ agency.name }}</h2>
      <pre> {{ agency | json }} </pre>
      <button (click)="onRemove()">➖ Remove Agency</button>
    </article>
  `,
  styles: [],
})
export class AgenciesViewPage {
  // agencyId = "";
  // agency: Agency | undefined;

  agency: Agency; // * never null at this point

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    // * data is assured to be ready
    this.agency = route.snapshot.data["agency"];
  }

  // * no init needed
  // ngOnInit(): void {
  //   this.agencyId = this.helper.getIdFromRoute(this.route);
  //   // this.agency = this.data.getAgencyById(this.agencyId);
  //   this.api.getAgencyById$(this.agencyId).subscribe({
  //     next: (body) => (this.agency = body),
  //   });
  // }

  onRemove() {
    this.api
      .deleteAgency$(this.agency.id)
      .subscribe(() => this.router.navigate(["agencies"]));
  }
}
