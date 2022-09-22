import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-reloading",
  template: `
    <button (click)="onClick()">♻️ Reload</button>
    <aside *ngIf="isReloading">Reloading... please wait. ⌛</aside>
  `,
  styles: [],
})
export class ReloadingComponent {
  @Output() reload = new EventEmitter<void>();
  isReloading = false;
  onClick = () => {
    this.isReloading = true;
    this.reload.next();
  };
}
