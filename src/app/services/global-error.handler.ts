import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, inject } from "@angular/core";
import { ErrorMediatorService } from "./error-mediator.service";

export class GlobalErrorHandler implements ErrorHandler {
  private errorMediator: ErrorMediatorService = inject(ErrorMediatorService);

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) return;
    this.errorMediator.error$.next({
      category: "app",
      message: "😨 App Error",
      error,
    });
  }
}
