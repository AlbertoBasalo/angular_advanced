import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  template: `
    <app-header [title]="appTitle"></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer [title]="appTitle"></app-footer>
  `,
  styles: [],
})
export class AppComponent {
  appTitle = environment.title;
  constructor(router: Router, titleService: Title) {
    router.events
      .pipe(
        tap((event) => console.log("re", event)),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getTitle(router))
      )
      .subscribe((title: string) =>
        titleService.setTitle(`AB - ${title || ""}`)
      );
  }

  private getTitle(router: Router) {
    // https://dev.to/brandontroberts/setting-page-titles-natively-with-the-angular-router-393j
    let route: ActivatedRoute = router.routerState.root;
    let routeTitle = "";
    while (route.firstChild) {
      route = route.firstChild;
    }
    if (route.snapshot.data["title"]) {
      routeTitle = route.snapshot.data["title"];
    }
    return routeTitle;
  }
}
