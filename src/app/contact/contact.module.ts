import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { ContactRoutingModule } from "./contact-routing.module";
import { ContactPage } from "./contact.page";

@NgModule({
  declarations: [ContactPage],
  imports: [CommonModule, ContactRoutingModule, SharedModule],
})
export class ContactModule {}
