import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule  } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingAreaComponent } from './landing-area/landing-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartyHomeComponent } from './party-home/party-home.component';
import { PartyAgendaComponent } from './party-agenda/party-agenda.component';
import { MovieGameComponent } from './movie-game/movie-game.component';
import { GameButtonsComponent } from './movie-game/game-buttons/game-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingAreaComponent,
    PartyHomeComponent,
    PartyAgendaComponent,
    MovieGameComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'home', component: PartyHomeComponent},
      {path: 'game', component: MovieGameComponent},
      {path: '**', redirectTo: '/home', pathMatch: 'full'}
    ]),
    GameButtonsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
