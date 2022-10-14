import { inject, Injectable, InjectionToken, NgModule } from "@angular/core";

// @Injectable({ providedIn: "root" })
// export class LoggerService {
//   private logLevel: string = "verbose";

//   log(message: string, payload?: any) {
//     if (this.logLevel !== "verbose") return;
//     console.log(message, payload);
//   }
//   warn(message: string, payload?: any) {
//     console.warn(message, payload);
//   }
//   error(message: string, error: Error) {
//     console.error(message, error);
//   }
// }

export const LOGGER_LEVEL = new InjectionToken<string>("logger-level");

@NgModule({
  providers: [{ provide: LOGGER_LEVEL, useValue: "verbose" }],
})
export class AppModule {}

// @Injectable({ providedIn: "root" })
// export class LoggerService {
//   constructor(@Inject(LOGGER_LEVEL) private logLevel: string) {}

//   log(message: string, payload?: any) {
//     if (this.logLevel !== "verbose") return;
//     console.log(message, payload);
//   }
//   warn(message: string, payload?: any) {
//     console.warn(message, payload);
//   }
//   error(message: string, error: Error) {
//     console.error(message, error);
//   }
// }

@Injectable({ providedIn: "root" })
export class LoggerService {
  private logLevel: string = inject(LOGGER_LEVEL) || "verbose";

  log(message: string, payload?: any) {
    if (this.logLevel !== "verbose") return;
    console.log(message, payload);
  }
  warn(message: string, payload?: any) {
    console.warn(message, payload);
  }
  error(message: string, error: Error) {
    console.error(message, error);
  }
}
