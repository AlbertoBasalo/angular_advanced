import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticatedGuard implements CanLoad {
  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authentication.user.isAuthenticated) return true;
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
