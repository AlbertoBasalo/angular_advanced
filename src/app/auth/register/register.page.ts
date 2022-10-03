import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  template: `
    <h2>🔏 Register creating a new account</h2>
    <app-register-form></app-register-form>
  `,
  styles: [],
})
export class RegisterPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
