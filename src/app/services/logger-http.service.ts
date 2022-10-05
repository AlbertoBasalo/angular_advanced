import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { exhaustMap, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { LoggerBaseService } from "./logger-base.service";
import { LOGGER_LEVEL, LogLevel } from "./logger.tokens";

@Injectable({
  providedIn: "root",
})
export class LoggerHttpService extends LoggerBaseService {
  private logEntriesUrl = `${environment.apiServerUrl}/log-entries`;

  constructor(
    private http: HttpClient,
    @Inject(LOGGER_LEVEL) loggerLevel: LogLevel
  ) {
    super();
    // * also with parameter on constructor
    this.loggerLevel = loggerLevel;
    this.processLogEntries$();
  }

  log(message: string) {
    if (this.loggerLevel == "minimal") return;
    const logEntry = this.createLogEntry(message, "log");
    this.queueLogEntry(logEntry);
  }

  warn(message: string) {
    const logEntry = this.createLogEntry(message, "warn");
    this.queueLogEntry(logEntry);
  }
  error(message: string, error: Error) {
    if (error instanceof HttpErrorResponse) {
      console.warn("HttpErrorResponse not sent to avoid endless loop", error);
      return;
    }
    const logEntry = this.createLogEntry(message, "error");
    logEntry.error = error.message;
    this.queueLogEntry(logEntry);
  }

  private createLogEntry(message: string, category: string): any {
    return {
      timestamp: new Date().toISOString(),
      message,
      appVersion: this.appVersion,
      category,
    };
  }

  private logEntries$ = new Subject<any>();
  private queueLogEntry(logEntry: any) {
    this.logEntries$.next(logEntry);
  }
  private processLogEntries$() {
    this.logEntries$
      .pipe(
        tap((logEntry) => console.log("logEntry", logEntry)),
        exhaustMap((l) => this.createPostLogEntry$(l))
      )
      .subscribe((x) => console.log("log entry sent to server", x));
  }

  private createPostLogEntry$(logEntry: any) {
    return this.http.post(this.logEntriesUrl, logEntry);
  }
}
