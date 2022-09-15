import { Component } from "@angular/core";

@Component({
  selector: "app-reloading",
  template: `
    <button (click)="reload()">♻️ Reload</button>
    <aside *ngIf="isReloading">Reloading... please wait. ⌛</aside>
  `,
  styles: [],
})
export class ReloadingComponent {
  isReloading = false;
  reload = () => (this.isReloading = true);
}
