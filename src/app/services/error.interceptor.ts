import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LoggerBaseService } from "./logger-base.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private logger: LoggerBaseService = inject(LoggerBaseService);
  private router: Router = inject(Router);

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
      this.logger.warn("👮🏼‍♀️ Security error", error);
      this.router.navigate(["/", "auth", "login"]);
    }
    if (statusCode >= 500) {
      this.logger.error("👩🏼‍💼 Server error", error);
    }
    this.logger.error("🧑🏼‍💻 Client error", error);
  }
  private processApplicationError(error: Error) {
    this.logger.error("😨 App Error", error);
  }
}
