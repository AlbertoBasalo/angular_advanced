import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { LoggerBaseService } from "./logger-base.service";

export type ErrorCategory = "app" | "auth" | "client" | "server";
export type AppError = {
  category: ErrorCategory;
  message: string;
  error: Error;
};

@Injectable({
  providedIn: "root",
})
export class ErrorMediatorService {
  private logger: LoggerBaseService = inject(LoggerBaseService);
  private router: Router = inject(Router);
  error$ = new Subject<AppError>();
  constructor() {
    this.error$.subscribe({ next: (appError) => this.onError(appError) });
  }
  onError(appError: AppError) {
    switch (appError.category) {
      case "app":
        this.logger.error("😨 App Error", appError.error);
        break;
      case "auth":
        this.logger.error("👮🏼‍♀️ Security error", appError.error);
        this.router.navigate(["/", "auth", "login"]);
        break;
      case "client":
        this.logger.error("🧑🏼‍💻 Client error", appError.error);
        break;
      case "server":
        this.logger.error("👩🏼‍💼 Server error", appError.error);
        break;
      default:
        break;
    }
  }
}
