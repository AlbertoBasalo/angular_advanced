import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-info",
  template: `
    <pre>⚡{{ info$ | async }}</pre>
  `,
  styles: [],
})
export class InfoComponent {
  info$: Observable<string>;

  constructor(route: ActivatedRoute) {
    this.info$ = route.params.pipe(map((params) => params["msg"]));
  }
}
