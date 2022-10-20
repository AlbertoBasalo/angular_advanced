import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { Trip } from "src/app/models/trip.interface";
import { environment } from "../../../environments/environment";

export const futureFeatureKey = "future";

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

export const reducers: ActionReducerMap<FutureState> = {};

export const metaReducers: MetaReducer<FutureState>[] = !environment.production
  ? []
  : [];
