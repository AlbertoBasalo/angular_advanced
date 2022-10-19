import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";
import { Auth } from "../models/auth.interface";

@Injectable({ providedIn: "root" })
export class AuthenticationStore {
  private initialAuthState: Auth = {
    email: "",
    isAuthenticated: false,
    accessToken: "",
  };
  private state$ = new BehaviorSubject<Auth>(this.initialAuthState);

  getState() {
    return this.clone(this.state$.value);
  }
  getIsAuthenticated() {
    return this.getState().isAuthenticated;
  }

  getState$(): Observable<Auth> {
    return this.state$.asObservable().pipe(map((auth) => this.clone(auth)));
  }
  select$<T>(selector: (auth: Auth) => T): Observable<T> {
    return this.getState$().pipe(map(selector), distinctUntilChanged());
  }
  selectIsAuthenticated$(): Observable<boolean> {
    return this.select$<boolean>((auth) => auth.isAuthenticated);
  }

  setAuth(auth: Partial<Auth>) {
    this.state$.next({
      isAuthenticated: true,
      email: auth.email || "",
      accessToken: auth.accessToken || "",
    });
  }
  removeAuth() {
    const currentAuth = this.getState();
    const newAuth = {
      ...currentAuth,
      isAuthenticated: false,
    };
    this.state$.next(newAuth);
  }

  private clone(auth: Auth) {
    return JSON.parse(JSON.stringify(auth));
  }
}
