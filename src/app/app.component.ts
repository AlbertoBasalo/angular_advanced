import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { SwUpdate, VersionEvent } from "@angular/service-worker";
import { filter, interval, map, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  template: `
    <app-header [title]="appTitle"></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer [title]="appTitle"></app-footer>
    <h5>⚙️ Version updating control</h5>
    <section *ngIf="newVersion != ''">
      <h4>{{ newVersion }}</h4>
      <button (click)="onReloadClick()">♻️ RELOAD</button>
    </section>
  `,
  styles: [],
})
export class AppComponent {
  appTitle = environment.title;
  public newVersion = "";
  constructor(router: Router, titleService: Title, swUpdate: SwUpdate) {
    this.subscribeToUpdates(swUpdate);
    // this.checkForUpdates(swUpdate);
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap((event) => console.log("navigation", event)),
        map(() => this.getTitle(router))
      )
      .subscribe((title: string) =>
        titleService.setTitle(`AB - ${title || ""}`)
      );
  }
  onReloadClick() {
    window.location.reload();
  }

  private subscribeToUpdates(swUpdate: SwUpdate) {
    swUpdate.versionUpdates.subscribe((event: VersionEvent) => {
      console.log("versionUpdates event", event);
      if (event.type === "VERSION_READY") {
        const version = event.latestVersion;
        this.newVersion = version.appData
          ? JSON.stringify(version.appData)
          : version.hash;
      }
    });
  }
  private checkForUpdates(swUpdate: SwUpdate) {
    const oneMinute = 1000 * 60;
    interval(oneMinute).subscribe(() => swUpdate.checkForUpdate());
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
