import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <app-agencies></app-agencies>
    <app-trips></app-trips>
    <app-reloading></app-reloading>
  `,
  styles: [],
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
