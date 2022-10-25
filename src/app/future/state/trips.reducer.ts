import { Trip } from "src/app/models/trip.interface";
import { FutureState } from "./future.model";

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
