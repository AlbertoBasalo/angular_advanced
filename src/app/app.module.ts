import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AboutModule } from "./about/about.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";
import { HomeModule } from "./home/home.module";
import { InfoComponent } from './info.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, InfoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AboutModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
