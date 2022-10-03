import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterForm } from "./register.form";
import { RegisterPage } from "./register.page";

@NgModule({
  declarations: [RegisterPage, RegisterForm],
  imports: [CommonModule, RegisterRoutingModule, SharedModule],
})
export class RegisterModule {}
