import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ReloadingComponent } from "./reloading.component";

@NgModule({
  declarations: [ReloadingComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReloadingComponent, ReactiveFormsModule],
})
export class SharedModule {}
