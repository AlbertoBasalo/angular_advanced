import { createReducer, MetaReducer, on } from "@ngrx/store";
import { environment } from "../../../environments/environment";
import { FutureState, initialState } from "./future.model";
import { loadTrips, loadTripsFailure, loadTripsSuccess } from "./trips.actions";
import {
  loadTripsFailureReducer,
  loadTripsReducer,
  loadTripsSuccessReducer,
} from "./trips.reducer";
export * from "./future.model";
export * from "./trips.actions";
export * from "./trips.effects";
export * from "./trips.reducer";
export * from "./trips.selectors";
export const futureFeatureKey = "future";

export const reducers = createReducer(
  initialState,
  on(loadTrips, loadTripsReducer),
  on(loadTripsSuccess, loadTripsSuccessReducer),
  on(loadTripsFailure, loadTripsFailureReducer)
);

export const metaReducers: MetaReducer<FutureState>[] = !environment.production
  ? []
  : [];
