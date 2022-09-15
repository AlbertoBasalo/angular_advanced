import { Component } from "@angular/core";
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
}
