import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ReloadingComponent } from "./reloading.component";
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ReloadingComponent, ListComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReloadingComponent, ReactiveFormsModule, ListComponent],
})
export class SharedModule {}
