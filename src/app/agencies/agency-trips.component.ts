import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { HelperService } from "../services/helper.service";

@Component({
  selector: "app-agency-trips",
  template: `
    <h3>Showing trips for agency...</h3>
    <h4>{{ agency$ | async }}</h4>
    <h6>{{ agency }}</h6>
  `,
  styles: [],
})
export class AgencyTripsComponent {
  agency$;
  agency = "";
  constructor(route: ActivatedRoute, helper: HelperService) {
    this.agency$ = route.paramMap.pipe(map((paramMap) => paramMap.get("id")));
    this.agency = helper.getIdFromRoute(route); // ⚠️ unchanged, same component instance
  }
}
