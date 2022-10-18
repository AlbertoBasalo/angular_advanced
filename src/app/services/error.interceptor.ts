import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ErrorMediatorService } from "./error-mediator.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // private logger: LoggerBaseService = inject(LoggerBaseService);
  // private router: Router = inject(Router);
  private errorMediator: ErrorMediatorService = inject(ErrorMediatorService);
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.processError(error)));
  }

  private processError(error: any): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      this.processHttpError(error);
    } else {
      this.processApplicationError(error);
    }
    return throwError(() => error);
  }

  private processHttpError(error: HttpErrorResponse) {
    const statusCode = error.status;
    if (statusCode === 401) {
      // this.logger.warn("👮🏼‍♀️ Security error", error);
      // this.router.navigate(["/", "auth", "login"]);
      this.errorMediator.error$.next({
        category: "auth",
        message: "👮🏼‍♀️ Security error",
        error,
      });
      return;
    }
    if (statusCode >= 500) {
      // this.logger.error("👩🏼‍💼 Server error", error);
      this.errorMediator.error$.next({
        category: "server",
        message: "👩🏼‍💼 Server error",
        error,
      });
      return;
    }
    // this.logger.error("🧑🏼‍💻 Client error", error);
    this.errorMediator.error$.next({
      category: "client",
      message: "🧑🏼‍💻 Client error",
      error,
    });
  }
  private processApplicationError(error: Error) {
    // this.logger.error("😨 App Error", error);
    this.errorMediator.error$.next({
      category: "app",
      message: "😨 App Error",
      error,
    });
  }
}
