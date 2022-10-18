import { Component } from "@angular/core";
import { User } from "src/app/models/user.interface";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-register",
  template: `
    <h2>🔏 Register creating a new account</h2>
    <app-register-form (register)="onRegister($event)"></app-register-form>
  `,
  styles: [],
})
export class RegisterPage {
  constructor(private authentication: AuthenticationService) {}

  onRegister(user: Partial<User>) {
    this.authentication.register$(user).subscribe({
      next: (token) => {
        console.log("token", token);
      },
    });
  }
}
