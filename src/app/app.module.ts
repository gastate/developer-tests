import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservableComponent } from './tests/observable/observable.component';
import { HomeComponent } from './home/home.component';
import { FunctionsComponent } from './tests/functions/functions.component';
import { HtmlComponent } from './tests/html/html.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableComponent,
    HomeComponent,
    FunctionsComponent,
    HtmlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
