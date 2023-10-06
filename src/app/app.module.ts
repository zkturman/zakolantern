import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LandingAreaComponent } from './landing-area/landing-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartyHomeComponent } from './party-home/party-home.component';
import { PartyAgendaComponent } from './party-agenda/party-agenda.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingAreaComponent,
    PartyHomeComponent,
    PartyAgendaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
