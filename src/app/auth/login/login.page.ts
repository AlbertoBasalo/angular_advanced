import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentStatus } from "src/app/models/component-status.interface";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-login",
  template: `
    <h2>🔐 Login with your account</h2>
    <form [formGroup]="formGroup">
      <input type="email" formControlName="email" placeholder="email" />
      <input
        type="password"
        formControlName="password"
        placeholder="password"
      />
      <button (click)="onLogInClick()">Log me in</button>
      <button (click)="onGoHomeClick()">Go Home</button>
    </form>
  `,
  styles: [],
})
export class LoginPage implements ComponentStatus {
  formGroup = this.formBuilder.group({ email: "", password: "" });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  canDeactivate(): boolean {
    // * called from guards
    const hasPendingChanges = this.formGroup.dirty;
    if (hasPendingChanges) {
      const userWants = window.confirm("Exit without save?");
      return userWants;
    }
    return true;
  }

  onGoHomeClick() {
    this.router.navigateByUrl("/");
  }
  onLogInClick() {
    console.log("Simulated Login");
    this.formGroup.markAsPristine();
    this.authentication.user.isAuthenticated = true;
    this.navigateBack();
  }
  private navigateBack() {
    const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.router.navigateByUrl(returnUrl);
  }
}
