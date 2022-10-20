import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { loadTrips, loadTripsFailure, loadTripsSuccess } from "./trips.actions";

@Injectable()
export class TripsEffects {
  loadTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTrips),
      mergeMap(() =>
        this.api.getTrips$().pipe(
          map((trips) => loadTripsSuccess({ data: trips })),
          catchError((error) => of(loadTripsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private api: ApiService) {}
}
