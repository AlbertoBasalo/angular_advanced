import { Trip } from "src/app/models/trip.interface";

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
