import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Trip } from "src/app/models/trip.interface";
import { environment } from "../../../environments/environment";
import { loadTrips, loadTripsFailure, loadTripsSuccess } from "./trips.actions";
export * from "./trips.actions";
export const futureFeatureKey = "future";

// ToDo: move this to a separate file future.interface.ts
export interface FutureState {
  loading: boolean;
  trips: Trip[];
  error: string;
}
export const initialState: FutureState = {
  loading: false,
  trips: [],
  error: "",
};
// ToDo: move this to a separate file trips.reducer.ts
export const loadTripsReducer = (state: FutureState) => ({
  ...state,
  loading: true,
});
export const loadTripsSuccessReducer = (
  state: FutureState,
  actionPayload: { data: Trip[] }
) => ({
  ...state,
  loading: false,
  trips: actionPayload.data,
});
export const loadTripsFailureReducer = (
  state: FutureState,
  actionPayload: { error: string }
) => ({
  ...state,
  loading: false,
  error: actionPayload.error,
});

export const reducers = createReducer(
  initialState,
  on(loadTrips, loadTripsReducer),
  on(loadTripsSuccess, loadTripsSuccessReducer),
  on(loadTripsFailure, loadTripsFailureReducer)
);

export const metaReducers: MetaReducer<FutureState>[] = !environment.production
  ? []
  : [];
