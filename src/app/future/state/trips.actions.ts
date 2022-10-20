import { createAction, props } from "@ngrx/store";
import { Trip } from "src/app/models/trip.interface";

export const loadTrips = createAction("[Trips] Load Trips");

export const loadTripsSuccess = createAction(
  "[Trips] Load Trips Success",
  props<{ data: Trip[] }>()
);

export const loadTripsFailure = createAction(
  "[Trips] Load Trips Failure",
  props<{ error: string }>()
);
