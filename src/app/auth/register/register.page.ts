import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  template: `
    <h2>🔏 Register creating a new account</h2>
    <form>
      <input type="text" placeholder="name" />
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <input type="password" placeholder="confirm password" />
    </form>
  `,
  styles: [],
})
export class RegisterPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
