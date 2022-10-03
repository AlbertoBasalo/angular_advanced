import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginPage } from "./login.page";
import { LoginForm } from './login.form';

@NgModule({
  declarations: [LoginPage, LoginForm],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
})
export class LoginModule {}
