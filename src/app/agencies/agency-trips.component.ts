import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Component({
  selector: "app-agency-trips",
  template: `
    <h3>Showing trips for agency...</h3>
    <h4>{{ route$ | async }}</h4>
  `,
  styles: [],
})
export class AgencyTripsComponent {
  route$;
  constructor(private route: ActivatedRoute) {
    this.route$ = route.paramMap.pipe(map((paramMap) => paramMap.get("id")));
  }
}
