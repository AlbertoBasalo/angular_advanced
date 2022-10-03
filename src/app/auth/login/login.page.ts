import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentStatus } from "src/app/models/component-status.interface";
import { Credentials } from "src/app/models/credentials.interface";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-login",
  template: `
    <h2>🔐 Login with your account</h2>
    <app-login-form
      (login)="onLogIn($event)"
      (goHome)="onGoHome()"
      (formDirty)="onFormDirty($event)"
    ></app-login-form>
  `,
  styles: [],
})
export class LoginPage implements ComponentStatus {
  isFormDirty = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  canDeactivate(): boolean {
    // * called from guards
    if (this.isFormDirty) {
      const userWants = window.confirm("Exit without save?");
      return userWants;
    }
    return true;
  }

  onGoHome() {
    this.router.navigate([
      { outlets: { primary: ["/"], info: ["exit with out log in"] } },
    ]);
  }
  onLogIn(credentials: Credentials) {
    console.log("Simulated Login", credentials);
    this.authentication.user.isAuthenticated = true;
    this.navigateBack();
  }
  onFormDirty($event: boolean) {
    this.isFormDirty = $event;
  }
  private navigateBack() {
    const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.router.navigate([
      {
        outlets: { primary: returnUrl, info: "👋🏼 logged in" },
      },
    ]);
  }
}
