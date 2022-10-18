import { Component, Input } from "@angular/core";

@Component({
  selector: "app-footer",
  styles: [],
  template: `
    <footer>
      <nav>
        <section>
          <h6>{{ title }}</h6>
          <p [style]="subtitleStyle">{{ subtitle | lowercase }}</p>
          <a [href]="authorUrl">{{ author }}</a>
        </section>
        <section>
          <router-outlet name="info"></router-outlet>
        </section>
        <ul>
          <li><a routerLink="/about">ℹ️ About us</a></li>
          <li><a routerLink="/contact">📧 Contact</a></li>
        </ul>
      </nav>
      <app-notifications></app-notifications>
    </footer>
  `,
})
export class FooterComponent {
  @Input() title = "";
  subtitle = "Welcome on board";
  subtitleStyle = "font-style: italic";
  author = "Alberto Basalo";
  authorUrl = "https://twitter.com/albertobasalo";
}
