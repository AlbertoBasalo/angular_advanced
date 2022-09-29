import { Component } from "@angular/core";

@Component({
  selector: "app-about",
  template: `
    <article>
      <h1>ℹ️ About us</h1>
      <p>Astro Bookings, fly to the universe!</p>
      <nav>
        <a routerLink="history">📜 Our history</a>
        <a routerLink="mission">⛰️ Our mission</a>
      </nav>
      <footer>
        <!-- ⚠️ linked to children property of this route -->
        <router-outlet></router-outlet>
      </footer>
    </article>
  `,
  styles: [],
})
export class AboutPage {}
