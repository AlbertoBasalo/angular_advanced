import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchPage } from "./search.page";

@NgModule({
  declarations: [SearchPage],
  imports: [CommonModule, SearchRoutingModule, SharedModule],
})
export class SearchModule {}
