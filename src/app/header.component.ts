import { Component, inject, Input } from "@angular/core";
import { AuthenticationStore } from "./auth/authentication.store";

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
          <li><a routerLink="/trips">➡️ Trips</a></li>
          <li><a routerLink="/future">🔮 Future</a></li>
          <ng-container *ngIf="isAnonymous$ | async">
            <li><a routerLink="/auth/register">🔏 Register</a></li>
            <li><a routerLink="/auth/login">🔐 Login</a></li>
          </ng-container>
          <li><a routerLink="/search">🔎 Search</a></li>
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  @Input() title = "";
  private authenticationStore: AuthenticationStore =
    inject(AuthenticationStore);
  // isAnonymous$ = this.authenticationStore
  //   .selectIsAuthenticated$()
  //   .pipe(map((isAuthenticated) => !isAuthenticated));
  isAnonymous$ = this.authenticationStore.select$(
    (auth) => !auth.isAuthenticated
  );
}
