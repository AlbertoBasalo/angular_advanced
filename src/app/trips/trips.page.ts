import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `
    <p>trips works!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsPage {}
