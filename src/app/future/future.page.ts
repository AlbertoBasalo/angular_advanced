import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  template: `
    <p>
      future works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuturePage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
