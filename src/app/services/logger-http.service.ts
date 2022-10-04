import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoggerBaseService } from "./logger-base.service";
import { LOGGER_LEVEL, LogLevel } from "./logger.tokens";

@Injectable({
  providedIn: "root",
})
export class LoggerHttpService extends LoggerBaseService {
  logEntriesUrl = `${environment.apiServerUrl}/log-entries`;
  constructor(
    private http: HttpClient,
    @Inject(LOGGER_LEVEL) loggerLevel: LogLevel
  ) {
    super();
    this.logLevel = loggerLevel;
  }

  log(message: string) {
    if (this.logLevel == "minimal") return;
    this.postLogEntry({
      timestamp: new Date().toISOString(),
      message,
      appVersion: this.appVersion,
      category: "log",
    });
  }

  warn(message: string) {
    this.postLogEntry({
      timestamp: new Date().toISOString(),
      message,
      appVersion: this.appVersion,
      category: "warn",
    });
  }
  error(message: string, error: Error) {
    this.postLogEntry({
      timestamp: new Date().toISOString(),
      message,
      appVersion: this.appVersion,
      category: "error",
      error: error.message,
    });
  }

  private postLogEntry(logEntry: any) {
    this.http.post(this.logEntriesUrl, logEntry).subscribe();
  }
}
