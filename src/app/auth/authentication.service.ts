import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Credentials } from "../models/credentials.interface";
import { User } from "../models/user.interface";
import { ApiService } from "../services/api.service";
import { AuthenticationStore } from "./authentication.store";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private store: AuthenticationStore, private api: ApiService) {}

  register$(user: Partial<User>): Observable<string> {
    return this.api
      .register$({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .pipe(
        tap((token) =>
          this.store.setAuth({ email: user.email, accessToken: token })
        )
      );
  }

  logIn$(credentials: Partial<Credentials>): Observable<string> {
    return this.api
      .logIn$(credentials)
      .pipe(
        tap((token) =>
          this.store.setAuth({ email: credentials.email!, accessToken: token })
        )
      );
  }
}
