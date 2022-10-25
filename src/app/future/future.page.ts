import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  FutureState,
  loadTrips,
  selectError,
  selectLoading,
  selectTrips,
} from "./state";

@Component({
  template: `
    <h3>future works!</h3>
    <pre>Loading: {{ loading$ | async }}</pre>
    <pre>Trips: {{ trips$ | async | json }}</pre>
    <pre>Error: {{ error$ | async }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuturePage {
  loading$ = this.store.select(selectLoading);
  trips$ = this.store.select(selectTrips);
  error$ = this.store.select(selectError);
  constructor(private store: Store<FutureState>) {
    this.store.dispatch(loadTrips());
  }
}
