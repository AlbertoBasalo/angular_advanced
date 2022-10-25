import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FutureState } from "./future.model";

export const selectFutureState = createFeatureSelector<FutureState>("future");

export const selectLoading = createSelector(
  selectFutureState,
  (state: FutureState) => state.loading
);
export const selectTrips = createSelector(
  selectFutureState,
  (state: FutureState) => state.trips
);
export const selectError = createSelector(
  selectFutureState,
  (state: FutureState) => state.error
);
