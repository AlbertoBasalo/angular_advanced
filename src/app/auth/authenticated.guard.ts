import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationStore } from "./authentication.store";

@Injectable({
  providedIn: "root",
})
export class AuthenticatedGuard implements CanLoad {
  constructor(
    private router: Router,
    private authentication: AuthenticationStore
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(
      "this.authentication.isAuthenticated",
      this.authentication.isAuthenticated
    );
    if (this.authentication.isAuthenticated) return true;
    return this.redirectToLogin();
  }

  private redirectToLogin(): UrlTree {
    const navigationPath = ["auth", "login"];
    const returnUrl = this.router
      .getCurrentNavigation()
      ?.extractedUrl.toString();
    const navigationExtras = {
      queryParams: { returnUrl },
    };
    return this.router.createUrlTree(navigationPath, navigationExtras);
  }
}
