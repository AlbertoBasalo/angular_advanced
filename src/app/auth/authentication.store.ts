import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, map } from "rxjs";
import { Auth } from "../models/auth.interface";

@Injectable({ providedIn: "root" })
export class AuthenticationStore {
  private initialAuthState: Auth = {
    email: "",
    isAuthenticated: false,
    accessToken: "",
  };
  private authState$ = new BehaviorSubject<Auth>(this.initialAuthState);

  readonly auth$ = this.authState$.asObservable();
  readonly isAuthenticated$ = this.selector<boolean>(
    (auth) => auth.isAuthenticated
  );
  readonly isAuthenticated = this.authState$.getValue().isAuthenticated;

  setAuth(auth: Partial<Auth>) {
    this.authState$.next({
      isAuthenticated: true,
      email: auth.email || "",
      accessToken: auth.accessToken || "",
    });
  }
  removeAuth() {
    const currentAuth = this.authState$.value;
    const newAuth = {
      ...currentAuth,
      isAuthenticated: false,
    };
    this.authState$.next(newAuth);
  }
  selector<T>(selectorFn: (auth: Auth) => T) {
    return this.auth$.pipe(map(selectorFn), distinctUntilChanged());
  }
}
