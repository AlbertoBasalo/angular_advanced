import { ErrorHandler, inject } from "@angular/core";
import { ErrorMediatorService } from "./error-mediator.service";

export class GlobalErrorHandler implements ErrorHandler {
  private errorMediator: ErrorMediatorService = inject(ErrorMediatorService);

  handleError(error: any): void {
    this.errorMediator.error$.next({
      category: "app",
      message: "😨 App Error",
      error,
    });
  }
}
