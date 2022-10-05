import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
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
  }

  log(message: string) {
    if (this.loggerLevel == "minimal") return;
    const logEntry = this.createLogEntry(message, "log");
    this.postLogEntry(logEntry);
  }

  warn(message: string) {
    const logEntry = this.createLogEntry(message, "warn");
    this.postLogEntry(logEntry);
  }
  error(message: string, error: Error) {
    if (error instanceof HttpErrorResponse) {
      console.warn("HttpErrorResponse not sent to avoid endless loop", error);
      return;
    }
    const logEntry = this.createLogEntry(message, "error");
    logEntry.error = error.message;
    this.postLogEntry(logEntry);
  }

  private createLogEntry(message: string, category: string): any {
    return {
      timestamp: new Date().toISOString(),
      message,
      appVersion: this.appVersion,
      category,
    };
  }

  private postLogEntry(logEntry: any) {
    this.http.post(this.logEntriesUrl, logEntry).subscribe();
  }
}
