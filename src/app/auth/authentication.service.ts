import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  user = {
    name: "Anonymous",
    email: "",
    isAuthenticated: false,
  };

  constructor() {}
}
