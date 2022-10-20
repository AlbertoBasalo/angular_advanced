import { createFeatureSelector } from "@ngrx/store";
import { FutureState } from ".";

export const selectFutureState = createFeatureSelector<FutureState>("future");

export const selectFutureLoading = (state: FutureState) => state.loading;
