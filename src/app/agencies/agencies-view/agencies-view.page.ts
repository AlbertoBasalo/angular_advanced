import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Agency } from "src/app/models/agency.interface";
import { ApiService } from "src/app/services/api.service";
import { HelperService } from "src/app/services/helper.service";

@Component({
  selector: "app-agencies-view",
  template: `
    <article>
      <h2>{{ agency?.name }}</h2>
      <pre> {{ agency | json }} </pre>
      <button (click)="onRemove()">➖ Remove Agency</button>
    </article>
  `,
  styles: [],
})
export class AgenciesViewPage implements OnInit {
  agencyId = "";
  agency: Agency | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.agencyId = this.helper.getIdFromRoute(this.route);
    // this.agency = this.data.getAgencyById(this.agencyId);
    this.api.getAgencyById$(this.agencyId).subscribe({
      next: (body) => (this.agency = body),
    });
  }

  onRemove() {
    this.api
      .deleteAgency$(this.agencyId)
      .subscribe(() => this.router.navigate(["agencies"]));
  }
}
