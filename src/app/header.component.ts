import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header",
  styles: [
    `
      a {
        text-decoration: underline;
        margin-left: 0.4rem;
      }
      .title {
        font-weight: bold;
      }
    `,
  ],
  template: `
    <header>
      <nav>
        <ul>
          <a routerLink="/" class="title">{{ title | uppercase }}</a>
        </ul>
        <ul>
          <li><a routerLink="/agencies">➡️ Agencies</a></li>
          <li><a routerLink="/auth/register">🔏 Register</a></li>
          <li><a routerLink="/auth/login">🔐 Login</a></li>
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  @Input() title = "";
}
