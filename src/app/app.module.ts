import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AboutModule } from "./about/about.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";
import { HomeModule } from "./home/home.module";
import { InfoComponent } from "./info.component";
import { LoggerBaseService } from "./services/logger-base.service";
import { LoggerConsoleService } from "./services/logger-console.service";

import { environment } from "src/environments/environment";
import { ErrorInterceptor } from "./services/error.interceptor";
import { LoggerHttpService } from "./services/logger-http.service";
import {
  LOGGER_APP_VERSION,
  LOGGER_LEVEL,
  LogLevel,
} from "./services/logger.tokens";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, InfoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AboutModule,
    HttpClientModule,
  ],
  providers: [
    // { provide: LoggerBaseService, useClass: LoggerConsoleService }
    // {
    //   provide: LoggerBaseService,
    //   useFactory: (deps: HttpClient) =>
    //     environment.production
    //       ? new LoggerConsoleService()
    //       : new LoggerHttpService(deps),
    //   deps: [HttpClient],
    // },
    { provide: LOGGER_LEVEL, useValue: "minimal" },
    { provide: LOGGER_APP_VERSION, useValue: "1.14.5" },
    {
      provide: LoggerBaseService,
      useFactory: (http: HttpClient, loggerLevel: LogLevel) =>
        !environment.production
          ? new LoggerConsoleService(loggerLevel)
          : new LoggerHttpService(http, loggerLevel),
      deps: [HttpClient, LOGGER_LEVEL],
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(logger: LoggerBaseService) {
    logger.log("AppModule constructor");
    logger.warn("AppModule constructor", { data: "some data" });
    logger.error("AppModule constructor", new Error("some error"));
  }
}
