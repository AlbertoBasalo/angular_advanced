import { InjectionToken } from "@angular/core";

export type LogLevel = "minimal" | "verbose";

export const LOGGER_LEVEL = new InjectionToken<LogLevel>("logger-level");

export const LOGGER_APP_VERSION = new InjectionToken<string>(
  "logger-app-version"
);
