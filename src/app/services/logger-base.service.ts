import { inject, Injectable } from "@angular/core";
import { LOGGER_APP_VERSION, LogLevel } from "./logger.tokens";

@Injectable()
export abstract class LoggerBaseService {
  protected loggerLevel: LogLevel = "verbose";
  // protected appVersion = "1.0.0";
  // * configuration based on tokens
  protected appVersion = inject(LOGGER_APP_VERSION) || "1.0.0";

  constructor() {}

  abstract log(message: string, payload?: any): void;

  abstract warn(message: string, payload?: any): void;

  abstract error(message: string, error: Error): void;
}
